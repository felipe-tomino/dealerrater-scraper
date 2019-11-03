import DealerRaterScraper, { PAGES_TO_SCRAP } from './dealerRaterScraper';

const mcKaigSlug = 'McKaig-Chevrolet-Buick-A-Dealer-For-The-People-dealer-reviews-23685';
const mcKaigScraper = new DealerRaterScraper(mcKaigSlug);

mcKaigScraper.getReviews(PAGES_TO_SCRAP).then((reviews) => {
  console.log(JSON.stringify(reviews));
});
