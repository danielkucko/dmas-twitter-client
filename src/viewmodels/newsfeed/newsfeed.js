import TwitterService from '../../services/twitter-service';
import {inject} from 'aurelia-framework';

@inject(TwitterService)
export class Newsfeed {

  content = "";
  user = {};

  constructor(twitterService) {
    this.twitterService = twitterService;
    this.twitterService.getTweets();
    if (this.twitterService.loggedInUser == undefined){
      this.twitterService.getUserInfo();
    }
  }

  createTweet(){
    let tweet = {
      content: this.content,
      date: Date.now()
    };
    this.twitterService.createTweet(tweet);
  }

}
