import { ReviewRating } from '../../src/review';

export const html = '<div class="review-entry">\
  <div class="review-date">\
    <div class="italic col-xs-6 col-sm-12 pad-none margin-none font-20">October 30, 2019</div>\
    <div class = "dealership-rating">\
      <div class="rating-static visible-xs pad-none margin-none rating-50 pull-right"></div>\
    </div>\
  </div>\
  <div class="review-wrapper">\
    <h3>"Nina was very helpful and I enjoyed working with her to..."</h3>\
    <span>- Bagl94</span>\
    <p class="review-content">Nina was very helpful and I enjoyed working with her to bad she didn’t find me a car that worked she was helpful and will tell my friends and will be back to get a car soon</p>\
    <div class="review-ratings-all">\
      <div class="tr">\
        <div class="small-text">Customer Service</div>\
        <div class="rating-00"></div>\
      </div>\
      <div class="tr">\
        <div class="small-text">Quality of Work</div>\
        <div class="rating-00"></div>\
      </div>\
      <div class="tr">\
        <div class="small-text">Friendliness</div>\
        <div class="rating-00"></div>\
      </div>\
      <div class="tr">\
        <div class="small-text">Pricing</div>\
        <div class="rating-00"></div>\
      </div>\
      <div class="tr">\
        <div class="small-text">Overall Experience</div>\
        <div class="rating-50"></div>\
      </div>\
      <div class="tr">\
        <div class="small-text">Recommend Dealer</div>\
        <div class="small-text boldest">Yes</div>\
      </div>\
    </div>\
    <div class="review-employee">\
      <a>Nena Townsend</a>\
      <div class="employee-rating-badge-sm">\
        <div class="rating-static rating-50"></div>\
      </div>\
    </div>\
  </div>\
</div>'

export const dealerReview = {
  title: 'Nina was very helpful and I enjoyed working with her to...',
  content: 'Nina was very helpful and I enjoyed working with her to bad she didn’t find me a car that worked she was helpful and will tell my friends and will be back to get a car soon',
  date: new Date(Date.parse('October 30, 2019')),
  username: 'Bagl94',
  rating: new ReviewRating({
    finalRating: 5,
    overallRating: 5,
    customerService: 0,
    qualityOfWork: 0,
    friendliness: 0,
    price: 0,
    recommend: true,
    employessWorkedWith: [{
      name: 'Nena Townsend',
      rating: 5,
    }],
  }),
}
