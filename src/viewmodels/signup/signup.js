import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class Signup {

  firstName = 'Marge';
  lastName = 'Simpson';
  email = 'marge@simpson.com';
  password = 'secret';

  constructor(ts) {
    this.twitterService = ts;
  }

  register() {
    this.twitterService.register(this.firstName, this.lastName, this.email, this.password);
    this.twitterService.login(this.email, this.password);
  }
}
