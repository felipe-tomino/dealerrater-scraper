import { ReviewRating } from '../../src/review';

export const html = '<div class="review-entry">\
  <div class="review-date">\
    <div class="italic col-xs-6 col-sm-12 pad-none margin-none font-20">October 31, 2019</div>\
    <div class = "dealership-rating">\
      <div class="rating-static visible-xs pad-none margin-none rating-40 pull-right"></div>\
    </div>\
  </div>\
  <div class="review-wrapper">\
    <h3>"I was pleased with the initial communication and..."</h3>\
    <span>- Alisha</span>\
    <p class="review-content">I was pleased with the initial communication and attention to my needs. There was no pressuse to buy.  I found a vehicle I wanted and they tried to work with my budget.  Sales Rep was very nice but soma elderly gentleman came by and just wanted to know if I was ok. Buying a car is stressful and no one wants to be talked to fast and made to feel like your requests are unreasonable, but he made me believe he would do his best to help. I\'m no expert in car buying and. So I came to the right place</p>\
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
        <div class="rating-40"></div>\
      </div>\
      <div class="tr">\
        <div class="small-text">Recommend Dealer</div>\
        <div class="small-text boldest">Yes</div>\
      </div>\
    </div>\
    <div class="review-employee">\
      <a>Jeriamy Schumacher</a>\
      <div class="employee-rating-badge-sm">\
        <div class="rating-static rating-40"></div>\
      </div>\
    </div>\
  </div>\
</div>'

export const dealerReview = {
  title: 'I was pleased with the initial communication and...',
  content: 'I was pleased with the initial communication and attention to my needs. There was no pressuse to buy.  I found a vehicle I wanted and they tried to work with my budget.  Sales Rep was very nice but soma elderly gentleman came by and just wanted to know if I was ok. Buying a car is stressful and no one wants to be talked to fast and made to feel like your requests are unreasonable, but he made me believe he would do his best to help. I\'m no expert in car buying and. So I came to the right place',
  date: new Date(Date.parse('October 31, 2019')),
  username: 'Alisha',
  rating: new ReviewRating({
    finalRating: 4,
    overallRating: 4,
    customerService: 0,
    qualityOfWork: 0,
    friendliness: 0,
    price: 0,
    recommend: true,
    employessWorkedWith: [{
      name: 'Jeriamy Schumacher',
      rating: 4,
    }],
  }),
}
