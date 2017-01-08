import TwitterService from '../../services/twitter-service';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(TwitterService, Router)
export class Profile {

  tweets = [];
  loggedInUser = {};
  displayUser = {};

  constructor(twitterService, router){
    this.twitterService = twitterService;
    this.myRouter = router;
  }

  activate(){
    return new Promise((resolve, reject) => {
      let u = this.twitterService.loggedInUser;
      let d = this.twitterService.displayUser;
      if (d == undefined){
        this.twitterService.getUserTweets();
      } else if (d._id == this.loggedInUser._id){
        this.twitterService.getUserTweets();
      } else {
        this.twitterService.getTweetsByUser(d._id);
      }
      setTimeout(function(){resolve(u);}, 200);
    }).then(u => {
      this.loggedInUser = u;
      this.displayUser = this.twitterService.displayUser;
    });
  }

  deactivate(){
    this.twitterService.displayUser = undefined;
  }

  update(){
    this.twitterService.updateUser(this.loggedInUser);
  }


}
