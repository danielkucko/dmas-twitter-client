define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './services/messages', './services/twitter-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages, _twitterService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default, _aureliaFramework.Aurelia, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function App(ts, au, ea) {
      var _this = this;

      _classCallCheck(this, App);

      this.au = au;
      this.ts = ts;
      ea.subscribe(_messages.LoginStatus, function (msg) {
        if (msg.status.success === true) {
          _this.router.navigate('/', { replace: true, trigger: false });
          au.setRoot('home').then(function () {
            _this.router.navigateToRoute('newsfeed');
          });
        } else {
          _this.router.navigate('/', { replace: true, trigger: false });
          au.setRoot('app').then(function () {
            _this.router.navigateToRoute('login');
          }).catch(function (error) {
            console.log(error);
          });
        }
      });
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'login'], name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' }, { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' }]);

      config.mapUnknownRoutes(function (instruction) {
        return 'login';
      });

      this.router = router;
    };

    App.prototype.attached = function attached() {
      var _this2 = this;

      if (this.ts.isAuthenticated()) {
        this.au.setRoot('home').then(function () {
          _this2.router.navigateToRoute('newsfeed');
        });
      }
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('home',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia), _dec(_class = function () {
    function Home(au) {
      _classCallCheck(this, Home);

      this.aurelia = au;
    }

    Home.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'newsfeed'], name: 'newsfeed', moduleId: 'viewmodels/newsfeed/newsfeed', nav: true, title: 'Newsfeed' }, { route: 'profile', name: 'profile', moduleId: 'viewmodels/profile/profile', nav: true, title: 'Profile' }, { route: 'search', name: 'search', moduleId: 'viewmodels/search/search', nav: true, title: 'Search' }, { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }]);

      config.mapUnknownRoutes(function (instruction) {
        return 'newsfeed';
      });

      this.router = router;
    };

    return Home;
  }()) || _class);
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/async-http-client',['exports', 'aurelia-framework', 'aurelia-http-client', './fixtures', 'aurelia-event-aggregator', './messages'], function (exports, _aureliaFramework, _aureliaHttpClient, _fixtures, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AsyncHttpClient = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient, _fixtures2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function AsyncHttpClient(httpClient, fixtures, ea) {
      _classCallCheck(this, AsyncHttpClient);

      this.http = httpClient;
      this.http.configure(function (http) {
        http.withBaseUrl(fixtures.baseUrl);
      });
      this.ea = ea;
    }

    AsyncHttpClient.prototype.get = function get(url) {
      return this.http.get(url);
    };

    AsyncHttpClient.prototype.post = function post(url, obj) {
      return this.http.post(url, obj);
    };

    AsyncHttpClient.prototype.delete = function _delete(url) {
      return this.http.delete(url);
    };

    AsyncHttpClient.prototype.authenticate = function authenticate(url, user) {
      var _this = this;

      this.http.post(url, user).then(function (response) {
        var status = response.content;
        if (status.success) {
          localStorage.twitter = JSON.stringify(response.content);
          _this.http.configure(function (configuration) {
            configuration.withHeader('Authorization', 'bearer ' + response.content.token);
          });
        }
        _this.ea.publish(new _messages.LoginStatus(status));
      }).catch(function (error) {
        var status = {
          success: false,
          message: 'service not available'
        };
        _this.ea.publish(new _messages.LoginStatus(status));
      });
    };

    AsyncHttpClient.prototype.isAuthenticated = function isAuthenticated() {
      var authenticated = false;
      if (localStorage.twitter !== 'null') {
        authenticated = true;
        this.http.configure(function (http) {
          var auth = JSON.parse(localStorage.twitter);
          http.withHeader('Authorization', 'bearer ' + auth.token);
        });
      }
      return authenticated;
    };

    AsyncHttpClient.prototype.clearAuthentication = function clearAuthentication() {
      localStorage.twitter = null;
      this.http.configure(function (configuration) {
        configuration.withHeader('Authorization', '');
      });
    };

    return AsyncHttpClient;
  }()) || _class);
  exports.default = AsyncHttpClient;
});
define('services/fixtures',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Fixtures = function Fixtures() {
    _classCallCheck(this, Fixtures);

    this.baseUrl = 'https://rocky-ridge-20427.herokuapp.com';
  };

  exports.default = Fixtures;
});
define('services/messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LoginStatus = exports.LoginStatus = function LoginStatus(status) {
    _classCallCheck(this, LoginStatus);

    this.status = status;
  };
});
define('services/twitter-service',['exports', 'aurelia-framework', './fixtures', './messages', 'aurelia-event-aggregator', './async-http-client'], function (exports, _aureliaFramework, _fixtures, _messages, _aureliaEventAggregator, _asyncHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  var _asyncHttpClient2 = _interopRequireDefault(_asyncHttpClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var TwitterService = (_dec = (0, _aureliaFramework.inject)(_fixtures2.default, _aureliaEventAggregator.EventAggregator, _asyncHttpClient2.default), _dec(_class = function () {
    function TwitterService(data, ea, ac) {
      _classCallCheck(this, TwitterService);

      this.users = [];
      this.tweets = [];
      this.comments = [];

      this.methods = data.methods;
      this.ea = ea;
      this.ac = ac;
    }

    TwitterService.prototype.getUsers = function getUsers() {
      var _this = this;

      this.ac.get('/api/users').then(function (res) {
        _this.users = res.content;
      });
    };

    TwitterService.prototype.getTweets = function getTweets() {
      var _this2 = this;

      this.ac.get('/api/tweets').then(function (res) {
        _this2.tweets = res.content;
      });
    };

    TwitterService.prototype.getUserTweets = function getUserTweets() {
      var _this3 = this;

      this.ac.get('/api/users/' + this.loggedInUser._id + '/tweets').then(function (res) {
        _this3.tweets = res.content;
      });
    };

    TwitterService.prototype.getTweetsByUser = function getTweetsByUser(_id) {
      var _this4 = this;

      this.ac.get('/api/users/' + _id + '/tweets').then(function (res) {
        _this4.tweets = res.content;
      });
    };

    TwitterService.prototype.getComments = function getComments() {
      var _this5 = this;

      this.ac.get('/api/comments').then(function (res) {
        _this5.comments = res.content;
      });
    };

    TwitterService.prototype.updateUser = function updateUser(user) {
      var _this6 = this;

      this.ac.post('/api/users/update', user).then(function (res) {
        _this6.loggedInUser = res.content;
      });
    };

    TwitterService.prototype.createTweet = function createTweet(tweet) {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        _this7.ac.post('/api/tweets', tweet).then(function (res) {
          resolve(res.content);
        });
      });
    };

    TwitterService.prototype.getUserInfo = function getUserInfo() {
      var _this8 = this;

      this.ac.get('/api/loggedInUser').then(function (res) {
        _this8.loggedInUser = res.content;
      });
    };

    TwitterService.prototype.getUserDetail = function getUserDetail(_id) {
      var _this9 = this;

      this.ac.get('/api/users/' + _id).then(function (res) {
        _this9.displayUser = res.content;
      });
    };

    TwitterService.prototype.search = function search(keyword) {
      var _this10 = this;

      this.ac.post('/api/users/search', keyword).then(function (res) {
        _this10.users = res.content;
      });
    };

    TwitterService.prototype.deleteTweet = function deleteTweet(_id) {
      this.ac.delete('/api/tweets/' + _id).then(function (res) {});
    };

    TwitterService.prototype.register = function register(firstName, lastName, email, password) {
      var newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      this.ac.post('/api/users', newUser);
    };

    TwitterService.prototype.login = function login(email, password) {
      var user = {
        email: email,
        password: password
      };
      this.ac.authenticate('/api/users/authenticate', user);
    };

    TwitterService.prototype.logout = function logout() {
      var status = {
        success: false,
        message: ''
      };
      this.ac.clearAuthentication();
      this.ea.publish(new _messages.LoginStatus(status));
      this.loggedInUser = undefined;
    };

    TwitterService.prototype.isAuthenticated = function isAuthenticated() {
      return this.ac.isAuthenticated();
    };

    return TwitterService;
  }()) || _class);
  exports.default = TwitterService;
});
define('viewmodels/login/login',['exports', 'aurelia-framework', '../../services/twitter-service'], function (exports, _aureliaFramework, _twitterService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default), _dec(_class = function () {
    function Login(ts) {
      _classCallCheck(this, Login);

      this.email = 'marge@simpson.com';
      this.password = 'secret';

      this.twitterService = ts;
      this.prompt = '';
    }

    Login.prototype.login = function login(e) {
      this.twitterService.login(this.email, this.password);
    };

    return Login;
  }()) || _class);
});
define('viewmodels/logout/logout',['exports', '../../services/twitter-service', 'aurelia-framework'], function (exports, _twitterService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Logout = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Logout = exports.Logout = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default), _dec(_class = function () {
    function Logout(twitterService) {
      _classCallCheck(this, Logout);

      this.twitterService = twitterService;
    }

    Logout.prototype.logout = function logout() {
      this.twitterService.logout();
    };

    return Logout;
  }()) || _class);
});
define('viewmodels/newsfeed/newsfeed',['exports', '../../services/twitter-service', 'aurelia-framework'], function (exports, _twitterService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Newsfeed = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Newsfeed = exports.Newsfeed = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default), _dec(_class = function () {
    function Newsfeed(twitterService) {
      _classCallCheck(this, Newsfeed);

      this.content = "";
      this.user = {};

      this.twitterService = twitterService;
    }

    Newsfeed.prototype.activate = function activate() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.twitterService.getTweets();
        if (_this.twitterService.loggedInUser == undefined) {
          _this.twitterService.getUserInfo();
        }
        var u = _this.twitterService.loggedInUser;
        setTimeout(function () {
          resolve(u);
        }, 400);
      }).then(function (u) {
        _this.user = u;
      });
    };

    Newsfeed.prototype.createTweet = function createTweet() {
      var _this2 = this;

      var tweet = {
        content: this.content,
        date: Date.now()
      };
      this.twitterService.createTweet(tweet).then(function (t) {
        _this2.twitterService.tweets.unshift(t);
      });
    };

    return Newsfeed;
  }()) || _class);
});
define('viewmodels/profile/profile',['exports', '../../services/twitter-service', 'aurelia-framework', 'aurelia-router'], function (exports, _twitterService, _aureliaFramework, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Profile = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Profile = exports.Profile = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default, _aureliaRouter.Router), _dec(_class = function () {
    function Profile(twitterService, router) {
      _classCallCheck(this, Profile);

      this.tweets = [];
      this.loggedInUser = {};
      this.displayUser = {};

      this.twitterService = twitterService;
      this.myRouter = router;
    }

    Profile.prototype.activate = function activate() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var u = _this.twitterService.loggedInUser;
        var d = _this.twitterService.displayUser;
        if (d == undefined) {
          _this.twitterService.getUserTweets();
        } else if (d._id == _this.loggedInUser._id) {
          _this.twitterService.getUserTweets();
        } else {
          _this.twitterService.getTweetsByUser(d._id);
        }
        setTimeout(function () {
          resolve(u);
        }, 400);
      }).then(function (u) {
        _this.loggedInUser = u;
        _this.displayUser = _this.twitterService.displayUser;
      });
    };

    Profile.prototype.deactivate = function deactivate() {
      this.twitterService.displayUser = undefined;
    };

    Profile.prototype.update = function update() {
      this.twitterService.updateUser(this.loggedInUser);
    };

    return Profile;
  }()) || _class);
});
define('viewmodels/search/search',['exports', '../../services/twitter-service', 'aurelia-framework', 'aurelia-router'], function (exports, _twitterService, _aureliaFramework, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Search = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Search = exports.Search = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default, _aureliaRouter.Router), _dec(_class = function () {
    function Search(twitterService, router) {
      _classCallCheck(this, Search);

      this.users = [];
      this.keyword = '';

      this.twitterService = twitterService;
      this.myRouter = router;
    }

    Search.prototype.search = function search() {
      this.twitterService.search(this.keyword);
      var that = this;
      for (var _iterator = this.users, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var u = _ref;

        this.users.pop();
      }
      setTimeout(function () {
        var u = that.twitterService.users;
        for (var _iterator2 = u, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var user = _ref2;

          that.users.push(user);
        }
      }, 200);
    };

    Search.prototype.goToProfile = function goToProfile(_id) {
      this.twitterService.getUserDetail(_id);
      var that = this;
      setTimeout(function () {
        that.myRouter.navigate("Profile");
      }, 200);
    };

    return Search;
  }()) || _class);
});
define('viewmodels/signup/signup',['exports', 'aurelia-framework', '../../services/twitter-service'], function (exports, _aureliaFramework, _twitterService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Signup = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Signup = exports.Signup = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default), _dec(_class = function () {
    function Signup(ts) {
      _classCallCheck(this, Signup);

      this.firstName = 'Marge';
      this.lastName = 'Simpson';
      this.email = 'marge@simpson.com';
      this.password = 'secret';

      this.twitterService = ts;
    }

    Signup.prototype.register = function register() {
      this.showSignup = false;
      this.twitterService.register(this.firstName, this.lastName, this.email, this.password);
      this.twitterService.login(this.email, this.password);
    };

    return Signup;
  }()) || _class);
});
define('viewmodels/tweetList/tweetList',['exports', 'aurelia-framework', '../../services/twitter-service'], function (exports, _aureliaFramework, _twitterService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TweetList = undefined;

  var _twitterService2 = _interopRequireDefault(_twitterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var TweetList = exports.TweetList = (_dec = (0, _aureliaFramework.inject)(_twitterService2.default), _dec(_class = function () {
    function TweetList(ts) {
      _classCallCheck(this, TweetList);

      this.tweets = [];
      this.loggedInUser = {};

      this.ts = ts;
      this.loggedInUser = this.ts.loggedInUser;
    }

    TweetList.prototype.activate = function activate() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var t = _this.ts.tweets;
        resolve(t);
      }).then(function (t) {
        for (var _iterator = _this.tweets, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var tweet = _ref;

          _this.tweets.pop();
        }
        for (var _iterator2 = t, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var _tweet = _ref2;

          _this.tweets.push(_tweet);
        }
      });
    };

    TweetList.prototype.delete = function _delete(_id) {
      this.ts.deleteTweet(_id);
      var tweetToDelete = this.tweets.find(function (tweet) {
        return tweet._id == _id;
      });
      this.tweets.splice(this.tweets.indexOf(tweetToDelete), 1);
    };

    return TweetList;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"nav-bar.html\"></require>\n  <div class=\"ui container page-host\">\n    <nav-bar router.bind=\"router\"></nav-bar>\n    <router-view></router-view>\n  </div>\n</template>\n"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"nav-bar.html\"></require>\n  <div class=\"ui container page-host\">\n    <nav-bar router.bind=\"router\"></nav-bar>\n    <router-view></router-view>\n  </div>\n</template>\n"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n  <nav class=\"ui inverted menu\">\n    <header class=\"header item\"><a href=\"/\"> DMAS Twitter </a></header>\n    <div class=\"right menu\">\n      <div repeat.for=\"row of router.navigation\">\n        <a class=\"${row.isActive ? 'active' : ''} item\"  href.bind=\"row.href\">${row.title}</a>\n      </div>\n    </div>\n  </nav>\n</template>\n"; });
define('text!viewmodels/login/login.html', ['module'], function(module) { module.exports = "<template>\n\n  <form submit.delegate=\"login($event)\" class=\"ui stacked segment form\">\n    <h3 class=\"ui header\">Log-in</h3>\n    <div class=\"field\">\n      <label>Email</label> <input placeholder=\"Email\" value.bind=\"email\"/>\n    </div>\n    <div class=\"field\">\n      <label>Password</label> <input type=\"password\" value.bind=\"password\"/>\n    </div>\n    <button class=\"ui blue submit button\">Login</button>\n    <h3>${prompt}</h3>\n  </form>\n\n</template>\n"; });
define('text!viewmodels/logout/logout.html', ['module'], function(module) { module.exports = "<template>\n\n  <form submit.delegate=\"logout($event)\" class=\"ui stacked segment form\">\n    <h3 class=\"ui header\">Are you sure you want to log out?</h3>\n    <button class=\"ui blue submit button\">Logout</button>\n  </form>\n\n</template>\n"; });
define('text!viewmodels/newsfeed/newsfeed.html', ['module'], function(module) { module.exports = "<template>\n\n  <section class=\"ui grid\" style=\"margin-top: 25px\">\n\n    <aside class=\"ui five wide column\">\n      <div class=\"ui card\">\n        <div class=\"image\">\n\n        </div>\n        <div class=\"content\">\n          <a class=\"header\">${user.firstName} ${user.lastName}</a>\n          <div class=\"meta\">\n            <span class=\"date\">Joined on: ${user.joined}</span>\n          </div>\n          <div class=\"description\">\n          </div>\n        </div>\n        <div class=\"extra content\">\n          <a>\n            <i class=\"user icon\"></i>\n          </a>\n        </div>\n      </div>\n    </aside>\n\n    <section class=\"ui six wide column\">\n      <compose class=\"ui six wide column\" view-model=\"../tweetList/tweetList\"></compose>\n    </section>\n\n    <div class=\"five wide column\">\n      <div class=\"raised segment\">\n        <form class=\"ui fluid form\" submit.delegate=\"createTweet()\">\n          Share your thoughts!\n          <textarea name=\"content\" placeholder=\"...\" maxlength=\"140\" value.bind=\"content\"\n                    style=\"resize: none\"></textarea>\n          <button class=\"ui submit button\">Tweet</button>\n        </form>\n      </div>\n    </div>\n\n  </section>\n</template>\n"; });
define('text!viewmodels/profile/profile.html', ['module'], function(module) { module.exports = "<template>\n\n  <div class=\"ui grid\" style=\"padding-top: 25px\">\n\n    <div class=\"ui ten wide column\">\n\n      <form submit.delegate=\"update()\" class=\"ui stacked segment form\"\n            if.bind=\"loggedInUser._id == displayUser._id || displayUser == undefined\">\n        <h3 class=\"ui header\">Update your profile information</h3>\n        <div class=\"two fields\">\n          <div class=\"field\">\n            <label>First Name</label>\n            <input type=\"text\" value.bind=\"loggedInUser.firstName\" required>\n          </div>\n          <div class=\"field\">\n            <label>Last Name</label>\n            <input type=\"text\" value.bind=\"loggedInUser.lastName\" required>\n          </div>\n        </div>\n        <div class=\"field\">\n          <label>Email</label>\n          <input type=\"text\" value.bind=\"loggedInUser.email\" required>\n        </div>\n        <div class=\"field\">\n          <label>Password</label>\n          <input type=\"password\" value.bind=\"loggedInUser.password\" required>\n        </div>\n        <button class=\"ui blue submit button\">Submit</button>\n      </form>\n\n      <div class=\"ui card\" if.bind=\"loggedInUser._id != displayUser._id && displayUser != undefined\">\n        <div class=\"image\">\n\n        </div>\n        <div class=\"content\">\n          <a class=\"header\">${displayUser.firstName} ${displayUser.lastName}</a>\n          <div class=\"meta\">\n            <span class=\"date\">Joined on: ${displayUser.joined}</span>\n          </div>\n          <div class=\"description\">\n          </div>\n        </div>\n        <div class=\"extra content\">\n\n        </div>\n      </div>\n\n    </div>\n\n    <div class=\"ui six wide column\">\n      Tweets by this User:\n      <compose view-model=\"../tweetList/tweetList\"></compose>\n    </div>\n\n  </div>\n\n</template>\n"; });
define('text!viewmodels/search/search.html', ['module'], function(module) { module.exports = "<template>\n\n  <form submit.delegate=\"search()\">\n    <input type=\"text\" name=\"Name\" value.bind=\"keyword\" placeholder=\"Search for User...\" required>\n    <button class=\"ui submit button\"><i class=\"ui search icon\"></i></button>\n  </form>\n\n  <div class=\"cards\">\n    <div class=\"ui card\" repeat.for=\"user of users\">\n      <div class=\"content\">\n        <img class=\"ui avatar image\" src=\"\" class=\"header\">${user.firstName} ${user.lastName}\n        <div class=\"meta\">\n          <span class=\"date\">Joined: ${user.joined}</span>\n        </div>\n        <div class=\"description\" style=\"padding: 10px\">\n          <button class=\"ui secondary basic button\" click.delegate=\"goToProfile(user._id)\">Go to Profile</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n</template>\n"; });
define('text!viewmodels/signup/signup.html', ['module'], function(module) { module.exports = "<template>\n  <form submit.delegate=\"register($event)\" class=\"ui stacked segment form\">\n    <h3 class=\"ui header\">Register</h3>\n    <div class=\"two fields\">\n      <div class=\"field\">\n        <label>First Name</label>\n        <input placeholder=\"First Name\" type=\"text\" value.bind=\"firstName\">\n      </div>\n      <div class=\"field\">\n        <label>Last Name</label>\n        <input placeholder=\"Last Name\" type=\"text\" value.bind=\"lastName\">\n      </div>\n    </div>\n    <div class=\"field\">\n      <label>Email</label>\n      <input placeholder=\"Email\" type=\"text\" value.bind=\"email\">\n    </div>\n    <div class=\"field\">\n      <label>Password</label>\n      <input type=\"password\" value.bind=\"password\">\n    </div>\n    <button class=\"ui blue submit button\">Submit</button>\n  </form>\n</template>\n"; });
define('text!viewmodels/tweetList/tweetList.html', ['module'], function(module) { module.exports = "<template>\n\n  <div class=\"cards\">\n    <div class=\"ui card\" repeat.for=\"tweet of tweets\">\n      <div class=\"content\">\n        <img class=\"ui avatar image\" src=\"\" class=\"header\">${tweet.author.firstName} ${tweet.author.lastName}\n        <div class=\"meta\">\n          <span class=\"date\">${tweet.date}</span>\n          <form submit.delegate=\"delete(tweet._id)\" if.bind=\"tweet.author._id == loggedInUser._id\">\n            <button class=\"submit\"><i class=\"ui delete icon\"></i></button>\n          </form>\n        </div>\n        <div class=\"description\" style=\"padding: 10px\">\n          ${tweet.content}\n        </div>\n      </div>\n    </div>\n  </div>\n\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map