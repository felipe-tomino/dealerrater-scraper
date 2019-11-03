import { logReview } from './review';
import DealerRaterScraper, { PAGES_TO_SCRAP } from './dealerRaterScraper';
import ReviewsRater from './reviewsRater';

const REVIEWS_TO_RETRIEVE = process.env.REVIEWS_TO_RETRIEVE ? parseInt(process.env.REVIEWS_TO_RETRIEVE, 10) : 3;

const mcKaigSlug = 'McKaig-Chevrolet-Buick-A-Dealer-For-The-People-dealer-reviews-23685';
const mcKaigScraper = new DealerRaterScraper(mcKaigSlug);

mcKaigScraper.getReviews(PAGES_TO_SCRAP).then((reviews) => {
  const reviewsRater = new ReviewsRater(reviews);
  const top3Reviews = reviewsRater.getTopReviews(REVIEWS_TO_RETRIEVE);

  console.log('\n\x1b[32m%s\x1b[0m', `Top ${REVIEWS_TO_RETRIEVE} Reviews:`);
  top3Reviews.forEach((review, index) => {
    console.log('\n\x1b[32m%s\x1b[0m', `Review ${index + 1}:`);
    logReview(review);
  });
});
