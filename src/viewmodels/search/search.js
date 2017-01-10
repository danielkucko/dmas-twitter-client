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

  search() {
    this.twitterService.search(this.keyword);
    let that = this;
    for (let u of this.users) {
      this.users.pop();
    }
    let u = that.twitterService.users;
    for (let user of u) {
      that.users.push(user);
    }

  }

  goToProfile(_id) {
    let detailUser = this.users.find(function (user) {
      return user._id == _id;
    });
    this.twitterService.displayUser = detailUser;
    this.myRouter.navigate("Profile");
  }

}
