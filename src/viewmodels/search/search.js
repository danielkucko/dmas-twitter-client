import TwitterService from '../../services/twitter-service';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';


@inject(TwitterService, Router)
export class Search {

  users = [];
  keyword = '';

  constructor(twitterService, router) {
    this.twitterService = twitterService;
    this.myRouter = router;
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

  goToProfile(_id){
    this.twitterService.getUserDetail(_id);
    let that = this;
    setTimeout(function(){
      that.myRouter.navigate("Profile");
    }, 200);
  }

}
