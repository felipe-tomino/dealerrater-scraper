import DealerRaterScraper from '../src/dealerRaterScraper';
import RequestPromise from 'request-promise';
import { html as page1html, dealerReview as review1 } from './htmlMocks/page1Mock';
import { html as page2html, dealerReview as review2 } from './htmlMocks/page2Mock';

jest.mock('request-promise', () => (url: string) => {
  if (url === 'https://www.dealerrater.com/dealer/test-slug/page1') {
    return page1html;
  } else if (url === 'https://www.dealerrater.com/dealer/test-slug/page2') {
    return page2html;
  } else {
    return '';
  }
});

describe('DealerRaterScraper', () => {
  let dealerRaterScraper: DealerRaterScraper;

  beforeAll(() => {
    dealerRaterScraper = new DealerRaterScraper('test-slug');
  });

  describe('getPageUrl', () => {
    it('should return dealer rater url for "test-slug"', () => {
      expect(dealerRaterScraper.getPageUrl()).toEqual('https://www.dealerrater.com/dealer/test-slug/page1');
    });
  });

  describe('getReviews', () => {
    it('returns parsed reviews from (mocked) pages', async () => {
      const reviews = await dealerRaterScraper.getReviews();
      expect(reviews).toMatchObject([review1, review2]);
    });
  });
});
