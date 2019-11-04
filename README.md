# DealerRater Scraper

This is a scraper for [DealerRater.com](https://www.dealerrater.com/). It scraps the reviews of a given Dealership and returns the top3 most "overly positive" reviews.

The chosen dealership for this project was [*'McKaig Chevrolet Buick - A Dealer For The People'*](https://www.dealerrater.com/dealer/McKaig-Chevrolet-Buick-A-Dealer-For-The-People-dealer-reviews-23685/).

The code is available at [GitHub](https://github.com/felipe-tomino/dealerrater-scraper).

## Ranking criteria

The chosen criteria in order to rank the reviews are:

1. If the reviewer recommends the Dealership or not. This criteria puts the positive reviews first.
2. The final rating of the user, calculated by dealerrater. It is the star rating that appears with the review date of submission.
3. A weighted sum of all ratings. The overall rating has double the weight of all of the other ratings, since it is the customer satisfaction considering everything.
4. The comparison of the other ratings, in this order:
    - Customer Service
    - Quality of Work
    - Price
    - Friendliness

    These ratings are compared one by one until any of them is different in the reviews beeing compared.
5. The rating of the employees that the customer worked with.
    - The average of these reviews is considered first
    - Then the sum of the ratings is considered, when the average is the same
6. Finally, if all of the previous criteria are the same, the reviews are ordered by the most recent ones

## Language

The chosen language was [Node.js](https://nodejs.org/) with [Typescript](https://www.typescriptlang.org/).

### Dependencies

- [Node.js](https://nodejs.org/) v10.15.3 or greater
- [NPM](https://www.npmjs.com) v6.4.1 or greater

The following [NPM packages](https://www.npmjs.com/) were used:

- [request-promise](https://www.npmjs.com/package/request-promise) to make the requests
- [cheerio](https://www.npmjs.com/package/cheerio) to parse the html responses
- [ts-node](https://www.npmjs.com/package/ts-node) and [typescript](https://www.npmjs.com/package/typescript) to use typescript instead of javascript
- [ts-jest](https://www.npmjs.com/package/ts-jest) to do the unit tests with [Jest](https://jestjs.io/)
- [tslint](https://www.npmjs.com/package/tslint) to keep the code clean, following some patterns. The [tslint-config-airbnb](https://www.npmjs.com/package/tslint-config-airbnb) tslint extension was used for its configurations

## Installation

After downloading the project, go to its directory and run the following command:
```bash
npm install
```
And it will install all of the project dependencies.

## Usage

In the project directory:

##### Scraping

```bash
npm run scrap
```
Will scrap the first five pages of reviews from [*'McKaig Chevrolet Buick - A Dealer For The People'*](https://www.dealerrater.com/dealer/McKaig-Chevrolet-Buick-A-Dealer-For-The-People-dealer-reviews-23685/) and print the top 3 most "overly positive" ones

You can set the number of pages to scrap and the number of reviews to retrieve using the following environment variables:

```bash
PAGES_TO_SCRAP=X
REVIEWS_TO_RETRIEVE=Y
```
where X is the desired number of pages to scrap and Y the number of reviews to show on the console. 5 is the default value for X and 3 is the default for Y.

These environment variables can also be set when running the application. For example:

```bash
PAGES_TO_SCRAP=5 REVIEWS_TO_RETRIEVE=3 npm run scrap
```
will scrap 5 pages and return the top 3 most "overly positive" reviews.

##### Testing

```bash
npm run test
```
will run the application tests.

##### Code Analysis

```bash
npm run lint
```
will run the TSLint static analysis tool. If it says nothing, the code is following its rules.
