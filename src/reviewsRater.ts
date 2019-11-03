import { IDealerReview } from './review';

export default class ReviewsRater {
  constructor(private readonly reviews: IDealerReview[]) {}

  public getTopReviews(reviewsCount: number): IDealerReview[] {
    return this.reviews.sort(this.sortReviewsByGreatestRatings).slice(0, reviewsCount);
  }

  private sortReviewsByGreatestRatings(reviewA: IDealerReview, reviewB: IDealerReview): number {
    const ratingPriority = [
      'recommend',
      'finalRating',
      'ratingsWeightedSum',
      'overallRating',
      'customerService',
      'qualityOfWork',
      'price',
      'friendliness'
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
    };

    // sort by employees ratings
    const reviewAEmployeesRatingSum = reviewA.rating.employessWorkedWith.reduce((prev, current) => {
      return prev + current.rating
    }, 0);
    const reviewBEmployeesRatingSum = reviewB.rating.employessWorkedWith.reduce((prev, current) => {
      return prev + current.rating
    }, 0);
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
