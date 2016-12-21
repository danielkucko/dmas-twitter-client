import TwitterService from '../../services/twitter-service';
import {inject} from 'aurelia-framework';

@inject(TwitterService)
export class Newsfeed {

  constructor(twitterService) {
    this.twitterService = twitterService;
  }

}
