import { IDealerReview, ReviewRating, IEmployeeRating } from './review';
import * as $ from 'cheerio';
import Crawler from './crawler';

export const PAGES_TO_SCRAP = process.env.PAGES_TO_SCRAP ? parseInt(process.env.PAGES_TO_SCRAP, 10) : 5;

export default class DealerRaterScraper extends Crawler {
  public readonly baseUrl: string = 'https://www.dealerrater.com/dealer';

  constructor(public readonly dealerSlug: string) {
    super();
  }

  public getPageUrl(page: number = 1): string {
    return `${this.baseUrl}/${this.dealerSlug}/page${page}`;
  }

  public async getReviews(pages: number = PAGES_TO_SCRAP): Promise<IDealerReview[]> {
    const reviewsScrap = await this.scrapReviews(pages);

    return reviewsScrap.map(reviewScrap => ({
      title: $('h3', reviewScrap).text().replace(/\"/g, '').trim(),
      content: $('.review-content', reviewScrap).text(),
      date: new Date(Date.parse($('.review-date div', reviewScrap).first().text())),
      username: $('span', reviewScrap).first().text().replace(/^(\s|\-)+/g, ''),
      rating: this.getReviewRating(reviewScrap),
    }));
  }

  private async scrapReviews(pages: number): Promise<CheerioElement[]> {
    const htmlPages = await this.getDealerHtmlPages(pages);
    return htmlPages.reduce((reviews, htmlPage) => {
      const pageReviews = $('.review-entry', htmlPage).toArray();
      return reviews.concat(pageReviews);
    }, []);
  }

  private async getDealerHtmlPages(pages: number): Promise<CheerioElement[][]> {
    const pageIndexes = [...Array(pages).keys()];
    return Promise.all(pageIndexes.map((page) => {
      const url = this.getPageUrl(page + 1);
      return this.downloadPage(url);
    }));
  }

  private getReviewRating(reviewScrap: CheerioElement): ReviewRating {
    const rating = {
      finalRating: 0,
      overallRating: 0,
      customerService: 0,
      qualityOfWork: 0,
      friendliness: 0,
      price: 0,
      recommend: true,
      employessWorkedWith: [] as IEmployeeRating[],
    };

    rating.finalRating = this.getRatingScrapValue($('.dealership-rating', reviewScrap));

    const reviewRatings = $('.review-ratings-all', reviewScrap).find('.tr').toArray();

    reviewRatings.forEach((reviewRating) => {
      const reviewRatingName = $('.small-text', reviewRating).text().toLowerCase();

      if (reviewRatingName.match(/customer\sservice/)) {
        rating.customerService = this.getRatingScrapValue($(reviewRating));
      } else if (reviewRatingName.match(/quality\sof\swork/)) {
        rating.qualityOfWork = this.getRatingScrapValue($(reviewRating));
      } else if (reviewRatingName.match(/friendliness/)) {
        rating.friendliness = this.getRatingScrapValue($(reviewRating));
      } else if (reviewRatingName.match(/pricing/)) {
        rating.price = this.getRatingScrapValue($(reviewRating));
      } else if (reviewRatingName.match(/overall\sexperience/)) {
        rating.overallRating = this.getRatingScrapValue($(reviewRating));
      } else if (reviewRatingName.match(/recommend\sdealer/)) {
        rating.recommend = $(reviewRating).text().toLowerCase().match(/yes/) ? true : false;
      }
    });

    const employees = $('.review-employee', reviewScrap).toArray();
    rating.employessWorkedWith = this.getEmployeesRating(employees);

    return new ReviewRating(rating);
  }

  private getEmployeesRating(employees: CheerioElement[]): IEmployeeRating[] {
    return employees.map(employee => ({
      name: $('a', employee).text().trim(),
      rating: this.getRatingScrapValue($('.employee-rating-badge-sm', employee)),
    }));
  }

  private getRatingScrapValue(rating: Cheerio): number {
    const ratingHtml = rating.html();
    const ratingValue = ratingHtml ? ratingHtml.match(/rating\-(\d\d)/) : 0;
    return ratingValue ? (parseFloat(ratingValue[1]) / 10) : 0;
  }
}
