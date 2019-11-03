import { ReviewRating, IDealerReview } from '../src/review';
import ReviewsRater from '../src/reviewsRater';

describe('ReviewsRater', () => {
  let reviewsRater: ReviewsRater;
  let reviews: IDealerReview[];
  let sortedReviews: IDealerReview[];

  beforeAll(() => {
    createReviews();
    reviewsRater = new ReviewsRater(reviews);
  });

  describe('getTopReviews', () => {
    describe('when multiple reviews are requested (2 or more)', () => {
      it('returns reviews sorted by greatest ratings', () => {
        expect(reviewsRater.getTopReviews(reviews.length)).toEqual(sortedReviews);
      });
    });

    describe('when only one review is requested', () => {
      it('returns only the greatest review', () => {
        expect(reviewsRater.getTopReviews(1)).toEqual(sortedReviews.slice(0, 1));
      });
    });
  });

  function createReviews(): IDealerReview[] {
    const currentTime = Date.now();

    const review1 = {
      title: 'title 1',
      content: 'content 1',
      date: new Date(currentTime),
      username: 'user 1',
      rating: new ReviewRating({
        finalRating: 1,
        overallRating: 1,
        customerService: 1,
        qualityOfWork: 1,
        friendliness: 1,
        price: 1,
        recommend: false,
        employessWorkedWith: [],
      }),
    };

    const review2 = {
      title: 'title 2',
      content: 'content 2',
      date: new Date(currentTime - 1),
      username: 'user 2',
      rating: new ReviewRating({
        finalRating: 4,
        overallRating: 4,
        customerService: 4,
        qualityOfWork: 4,
        friendliness: 4,
        price: 4,
        recommend: true,
        employessWorkedWith: [
          { name: 'employee 1', rating: 2 },
          { name: 'employee 2', rating: 3 },
        ],
      }),
    };

    const review3 = {
      title: 'title 3',
      content: 'content 3',
      date: new Date(currentTime),
      username: 'user 3',
      rating: new ReviewRating({
        finalRating: 4,
        overallRating: 4,
        customerService: 4,
        qualityOfWork: 4,
        friendliness: 4,
        price: 4,
        recommend: true,
        employessWorkedWith: [
          { name: 'employee 1', rating: 2 },
          { name: 'employee 2', rating: 3 },
        ],
      }),
    };

    const review4 = {
      title: 'title 4',
      content: 'content 4',
      date: new Date(currentTime),
      username: 'user 4',
      rating: new ReviewRating({
        finalRating: 4,
        overallRating: 4,
        customerService: 4,
        qualityOfWork: 4,
        friendliness: 4,
        price: 4,
        recommend: true,
        employessWorkedWith: [
          { name: 'employee 1', rating: 5 },
        ],
      }),
    };

    const review5 = {
      title: 'title 5',
      content: 'content 5',
      date: new Date(currentTime),
      username: 'user 5',
      rating: new ReviewRating({
        finalRating: 4,
        overallRating: 4,
        customerService: 4,
        qualityOfWork: 4,
        friendliness: 4,
        price: 4,
        recommend: true,
        employessWorkedWith: [
          { name: 'employee 1', rating: 5 },
          { name: 'employee 2', rating: 5 },
        ],
      }),
    };

    const review6 = {
      title: 'title 6',
      content: 'content 6',
      date: new Date(currentTime),
      username: 'user 6',
      rating: new ReviewRating({
        finalRating: 4,
        overallRating: 4,
        customerService: 5,
        qualityOfWork: 5,
        friendliness: 5,
        price: 5,
        recommend: true,
        employessWorkedWith: [{ name: 'employee 1', rating: 5 }],
      }),
    };

    const review7 = {
      title: 'title 7',
      content: 'content 7',
      date: new Date(currentTime),
      username: 'user 7',
      rating: new ReviewRating({
        finalRating: 4,
        overallRating: 5,
        customerService: 4,
        qualityOfWork: 5,
        friendliness: 5,
        price: 5,
        recommend: true,
        employessWorkedWith: [{ name: 'employee 1', rating: 5 }],
      }),
    };

    const review8 = {
      title: 'title 8',
      content: 'content 8',
      date: new Date(currentTime),
      username: 'user 8',
      rating: new ReviewRating({
        finalRating: 4,
        overallRating: 5,
        customerService: 5,
        qualityOfWork: 4,
        friendliness: 5,
        price: 5,
        recommend: true,
        employessWorkedWith: [{ name: 'employee 1', rating: 5 }],
      }),
    };

    const review9 = {
      title: 'title 9',
      content: 'content 9',
      date: new Date(currentTime),
      username: 'user 9',
      rating: new ReviewRating({
        finalRating: 4,
        overallRating: 5,
        customerService: 5,
        qualityOfWork: 5,
        friendliness: 5,
        price: 4,
        recommend: true,
        employessWorkedWith: [{ name: 'employee 1', rating: 5 }],
      }),
    };

    const review10 = {
      title: 'title 10',
      content: 'content 10',
      date: new Date(currentTime),
      username: 'user 10',
      rating: new ReviewRating({
        finalRating: 4,
        overallRating: 5,
        customerService: 5,
        qualityOfWork: 5,
        friendliness: 4,
        price: 5,
        recommend: true,
        employessWorkedWith: [{ name: 'employee 1', rating: 5 }],
      }),
    };

    const review11 = {
      title: 'title 11',
      content: 'content 11',
      date: new Date(currentTime),
      username: 'user 11',
      rating: new ReviewRating({
        finalRating: 4,
        overallRating: 5,
        customerService: 5,
        qualityOfWork: 5,
        friendliness: 5,
        price: 5,
        recommend: true,
        employessWorkedWith: [{ name: 'employee 1', rating: 5 }],
      }),
    };

    const review12 = {
      title: 'title 12',
      content: 'content 12',
      date: new Date(currentTime),
      username: 'user 12',
      rating: new ReviewRating({
        finalRating: 5,
        overallRating: 5,
        customerService: 5,
        qualityOfWork: 5,
        friendliness: 5,
        price: 5,
        recommend: true,
        employessWorkedWith: [{ name: 'employee 1', rating: 5 }],
      }),
    };

    reviews = [
      review1,
      review2,
      review3,
      review4,
      review5,
      review6,
      review7,
      review8,
      review9,
      review10,
      review11,
      review12,
    ];
    sortedReviews = [
      review12,
      review11,
      review10,
      review9,
      review8,
      review7,
      review6,
      review5,
      review4,
      review3,
      review2,
      review1,
    ];
    return reviews;
  }
});
