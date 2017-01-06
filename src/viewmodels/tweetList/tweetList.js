import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';

@inject(TwitterService)
export class TweetList{

  tweets = [];
  loggedInUser = {};

  constructor(ts){
    this.ts = ts;
    this.loggedInUser = this.ts.loggedInUser;
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
    let tweetToDelete = this.tweets.find(function(tweet){
      return tweet._id == _id;
    });
    this.tweets.splice(this.tweets.indexOf(tweetToDelete), 1);
  }

}

