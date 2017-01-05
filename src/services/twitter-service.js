import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {TotalUpdate, LoginStatus} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import AsyncHttpClient from './async-http-client';

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export default class TwitterService {

  users = [];
  tweets = [];
  comments = [];

  constructor(data, ea, ac) {
    this.methods = data.methods;
    this.ea = ea;
    this.ac = ac;
  }

  getUsers(){
    this.ac.get('/api/users').then(res => {
      this.users = res.content;
    });
  }

  getTweets(){
    this.ac.get('/api/tweets').then(res => {
      this.tweets = res.content;
    });
  }

  getUserTweets(){
    this.ac.get('/api/users/' + this.loggedInUser._id + '/tweets').then(res => {
      this.tweets = res.content;
    });
  }

  getComments(){
    this.ac.get('/api/comments').then(res => {
      this.comments = res.content;
    });
  }

  updateUser(user){
    this.ac.post('/api/users/update', user).then(res => {
      this.loggedInUser = res.content;
    });
  }

  createTweet(tweet){
    this.ac.post('/api/tweets', tweet).then(res => {
      return res.content;
    });
  }

  getUserInfo(){
    this.ac.get('/api/loggedInUser').then(res => {
      this.loggedInUser = res.content;
    });
  }

  register(firstName, lastName, email, password) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    this.ac.post('/api/users', newUser);
  }

  login(email, password) {
    const user = {
      email: email,
      password: password
    };
    this.ac.authenticate('/api/users/authenticate', user);
  }

  logout() {
    const status = {
      success: false,
      message: ''
    };
    this.ac.clearAuthentication();
    this.ea.publish(new LoginStatus(status));
    this.loggedInUser = undefined;
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }

}
