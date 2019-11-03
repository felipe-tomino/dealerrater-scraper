export interface IDealerReview {
  title: string;
  content: string;
  date: Date;
  username: string;
  rating: ReviewRating;
}

export interface IReviewRating {
  finalRating: number;
  overallRating: number;
  customerService: number;
  qualityOfWork: number;
  friendliness: number;
  price: number;
  recommend: boolean;
  employessWorkedWith: IEmployeeRating[];
}

export interface IEmployeeRating {
  name: string;
  rating: number;
}

export class ReviewRating implements IReviewRating {
  finalRating: number;
  overallRating: number;
  customerService: number;
  qualityOfWork: number;
  friendliness: number;
  price: number;
  recommend: boolean;
  employessWorkedWith: IEmployeeRating[];

  constructor(reviewRating: IReviewRating) {
    this.finalRating = reviewRating.finalRating;
    this.overallRating = reviewRating.overallRating;
    this.customerService = reviewRating.customerService;
    this.qualityOfWork = reviewRating.qualityOfWork;
    this.friendliness = reviewRating.friendliness;
    this.price = reviewRating.price;
    this.recommend = reviewRating.recommend;
    this.employessWorkedWith = reviewRating.employessWorkedWith;
  }

  public getPropertyValue(propertyName: string): any {
    switch (propertyName) {
      case 'finalRating': return this.finalRating;
      case 'ratingsWeightedSum':
        return (2 * this.overallRating + this.customerService + this.qualityOfWork + this.friendliness + this.price);
      case 'overallRating': return this.overallRating;
      case 'customerService': return this.customerService;
      case 'qualityOfWork': return this.qualityOfWork;
      case 'friendliness': return this.friendliness;
      case 'price': return this.price;
      case 'recommend': return this.recommend;
      case 'employessWorkedWith': return this.employessWorkedWith;
    }
  }
}

export function logReview(review: IDealerReview): void {
  console.log('\x1b[36m%s\x1b[0m\: %s', 'User', `${review.username}`);
  console.log('\x1b[36m%s\x1b[0m\: %s', 'Date', `${review.date.toDateString()}`);
  console.log('\x1b[36m%s\x1b[0m\: %s', 'Title', `${review.title}`);
  console.log('\x1b[36m%s\x1b[0m\:\n%s', 'Content', `${review.content}`);
  logRating(review.rating);
}

export function logRating(rating: ReviewRating): void {
  console.log('\x1b[36m%s\x1b[0m\:', 'Ratings');
  Object.keys(rating).forEach((ratingKey) => {
    if (ratingKey === 'employessWorkedWith') {
      logEmployeesRating(rating.employessWorkedWith);
    } else {
      console.log('\t\x1b[35m%s\x1b[0m\: %s', ratingKey, rating.getPropertyValue(ratingKey));
    }
  });
}

export function logEmployeesRating(employeesRatings: IEmployeeRating[]): void {
  console.log('\x1b[36m%s\x1b[0m\:', 'Employees Worked With');
  employeesRatings.forEach((employeeRating) => {
    console.log('\t\x1b[35m%s\x1b[0m\: %s', employeeRating.name, employeeRating.rating);
  });
}
