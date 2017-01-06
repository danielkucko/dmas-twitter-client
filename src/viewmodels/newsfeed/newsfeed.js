import TwitterService from '../../services/twitter-service';
import {inject} from 'aurelia-framework';

@inject(TwitterService)
export class Newsfeed {

  content = "";
  user = {};

  constructor(twitterService) {
    this.twitterService = twitterService;
  }

  activate(){
    return new Promise((resolve, reject) => {
      this.twitterService.getTweets();
      if (this.twitterService.loggedInUser == undefined){
        this.twitterService.getUserInfo();
      }
      let u = this.twitterService.loggedInUser;
      setTimeout(function(){resolve(u);}, 200);

    }).then(u => {
      this.user = u;
    });
  }

  createTweet(){
    let tweet = {
      content: this.content,
      date: Date.now()
    };
    this.twitterService.createTweet(tweet).then(t => {
        this.twitterService.tweets.unshift(t);
    });
  }

}
