import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class TweetList{

  tweets = [];

  constructor(ts){
    this.ts = ts;
  }

  activate(){
    return new Promise((resolve, reject) => {
      let t = this.ts.tweets;
      resolve(t);
    }).then(t => {
      this.tweets = t;
    });
  }

  delete(_id){
    this.ts.deleteTweet(_id);
  }

}

