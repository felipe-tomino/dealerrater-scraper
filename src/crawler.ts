import * as RequestPromise from 'request-promise';

export default abstract class Crawler {
  protected async downloadPage(url: string): Promise<CheerioElement[]> {
    console.log(`Fetching data from ${url}`);
    return RequestPromise.get(url);
  }
}
