import TwitterService from '../../services/twitter-service';
import {inject} from 'aurelia-framework';

@inject(TwitterService)
export class Logout {

  constructor(twitterService) {
    this.twitterService = twitterService;
  }

  logout() {
    this.twitterService.logout();
  }
}
