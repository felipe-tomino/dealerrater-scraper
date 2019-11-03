import { IDealerReview } from './review';

export default class ReviewsRater {
  constructor(private readonly reviews: IDealerReview[]) {}

  public getTopReviews(reviewsCount: number): IDealerReview[] {
    return this.reviews.sort(this.sortReviewsByGreatestRatingsDesc).slice(0, reviewsCount);
  }

  private sortReviewsByGreatestRatingsDesc(reviewA: IDealerReview, reviewB: IDealerReview): number {
    const ratingPriority = [
      'recommend',
      'finalRating',
      'ratingsWeightedSum',
      'overallRating',
      'customerService',
      'qualityOfWork',
      'price',
      'friendliness',
    ];

    // sort by general ratings
    for (const ratingType of ratingPriority) {
      const reviewARatingValue = reviewA.rating.getPropertyValue(ratingType);
      const reviewBRatingValue = reviewB.rating.getPropertyValue(ratingType);
      if (reviewARatingValue < reviewBRatingValue) {
        return 1;
      } else if (reviewARatingValue > reviewBRatingValue) {
        return -1;
      }
    }

    // sort by employees ratings
    const reviewAEmployeesRatingSum = reviewA.rating.employessWorkedWith.reduce((prev, cur) => prev + cur.rating, 0);
    const reviewAEmployeesRatingAverage = reviewAEmployeesRatingSum / reviewA.rating.employessWorkedWith.length;

    const reviewBEmployeesRatingSum = reviewB.rating.employessWorkedWith.reduce((prev, cur) => prev + cur.rating, 0);
    const reviewBEmployeesRatingAverage = reviewBEmployeesRatingSum / reviewB.rating.employessWorkedWith.length;

    // sort by employees ratings average
    if (reviewAEmployeesRatingAverage < reviewBEmployeesRatingAverage) {
      return 1;
    } else if (reviewAEmployeesRatingAverage > reviewBEmployeesRatingAverage) {
      return -1;
    }
    // sort by employees ratings sum
    if (reviewAEmployeesRatingSum < reviewBEmployeesRatingSum) {
      return 1;
    } else if (reviewAEmployeesRatingSum > reviewBEmployeesRatingSum) {
      return -1;
    }

    // sort by most recent
    if (reviewA.date < reviewB.date) {
      return 1;
    } else if (reviewA.date > reviewB.date) {
      return -1;
    }

    return 0;
  }
}
