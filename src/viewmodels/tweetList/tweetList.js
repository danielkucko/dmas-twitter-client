import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Tweets} from '../../services/messages';

@inject(TwitterService, EventAggregator)
export class TweetList{

  tweets = [];
  loggedInUser = {};

  constructor(ts, ea){
    this.ts = ts;
    this.loggedInUser = this.ts.loggedInUser;
    ea.subscribeOnce(Tweets, msg => {
      for (let t of this.tweets){
        this.tweets.pop();
      }
      for (let tweet of msg.tweets){
        this.tweets.push(tweet);
      }
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

