import { inject, Aurelia } from 'aurelia-framework';

@inject(Aurelia)
export class Home {

  constructor(au) {
    this.aurelia = au;
  }

  configureRouter(config, router) {
    config.map([
      { route: ['', 'newsfeed'], name: 'newsfeed', moduleId: 'viewmodels/newsfeed/newsfeed', nav: true, title: 'Newsfeed' },
      { route: 'search', name: 'search', moduleId: 'viewmodels/search/search', nav: true, title: 'Search' },
      { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }
    ]);

    /*config.mapUnknownRoutes(instruction => {
      return 'newsfeed';
    });*/

    this.router = router;
  }
}
