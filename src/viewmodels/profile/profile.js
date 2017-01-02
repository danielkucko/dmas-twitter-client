import TwitterService from '../../services/twitter-service';
import {inject} from 'aurelia-framework';

@inject(TwitterService)
export class Profile {

  tweets = [];
  loggedInUser = {};

  constructor(twitterService){
    this.twitterService = twitterService;
    this.twitterService.getUserTweets();
    this.loggedInUser = this.twitterService.loggedInUser;
  }

  update(){
    this.twitterService.updateUser(loggedInUser);
  }


}
