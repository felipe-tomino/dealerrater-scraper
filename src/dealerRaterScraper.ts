import { IDealerReview, ReviewRating, IEmployeeRating } from './review';
import * as RequestPromise from 'request-promise';
import * as $ from 'cheerio';

export const PAGES_TO_SCRAP = process.env.PAGES_TO_SCRAP ? parseInt(process.env.PAGES_TO_SCRAP, 10) : 5;

export default class DealerRaterScraper {
  public readonly baseUrl: string = 'https://www.dealerrater.com/dealer';

  constructor(public dealerSlug: string) {}

  public getPageUrl(page: number = 1): string {
    return `${this.baseUrl}/${this.dealerSlug}/page${page}`;
  }

  public async getReviews(pages: number = PAGES_TO_SCRAP): Promise<IDealerReview[]> {
    const reviewsScrap = await this.scrapReviews(pages);

    return reviewsScrap.map((reviewScrap) => {
      return {
        title: $('h3', reviewScrap).text().replace(/\"/g, '').trim(),
        content: $('.review-content', reviewScrap).text(),
        date: new Date(Date.parse($('.review-date div', reviewScrap).first().text())),
        username: $('span', reviewScrap).first().text().replace(/^(\s|\-)+/g, ''),
        rating: this.getReviewRating(reviewScrap),
      };
    });
  }

  private async scrapReviews(pages: number): Promise<CheerioElement[]> {
    let reviewsScrap: CheerioElement[] = [];
    await Promise.all([...Array(pages).keys()].map(async (page) => {
      const url = this.getPageUrl(page + 1);

      console.log(`Fetching data from ${url}`);
      const pageHtml = await RequestPromise.get(url);
      const pageHtmlReviews = $('.review-entry', pageHtml).toArray();
      reviewsScrap = reviewsScrap.concat(pageHtmlReviews);
    }));

    return reviewsScrap;
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
