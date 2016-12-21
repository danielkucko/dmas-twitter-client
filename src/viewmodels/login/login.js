import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class Login {

  email = 'marge@simpson.com';
  password = 'secret';

  constructor(ts) {
    this.twitterService = ts;
    this.prompt = '';
  }

  login(e) {
    this.twitterService.login(this.email, this.password);
  }
}
