import TwitterService from '../../services/twitter-service';
import {inject} from 'aurelia-framework';

@inject(TwitterService)
export class Profile {

  tweets = [];
  loggedInUser = {};

  constructor(twitterService){
    this.twitterService = twitterService;
  }

  activate(){
    return new Promise((resolve, reject) => {
      this.twitterService.getUserTweets();
      let u = this.twitterService.loggedInUser;
      resolve(u);
    }).then(u => {
        this.loggedInUser = u;
    });
  }

  update(){
    this.twitterService.updateUser(this.loggedInUser);
  }


}
