import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class TweetList{

  tweets = [];

  constructor(ts){
    this.ts = ts;
    this.tweets = this.ts.tweets;
  }

}

