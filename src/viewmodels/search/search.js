import TwitterService from '../../services/twitter-service';
import {inject} from 'aurelia-framework';

@inject(TwitterService)
export class Search {

  users = [];
  keyword = '';

  constructor(twitterService) {
    this.twitterService = twitterService;
  }

  search(){
    this.twitterService.search(this.keyword);
    let that = this;
    for (let u of this.users){
      this.users.pop();
    }
    setTimeout(function(){
      let u = that.twitterService.users;
      for (let user of u){
        that.users.push(user);
      }
    }, 200);
  }

}
