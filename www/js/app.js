angular.module('pug', ['ionic', 'pug.services', 'pug.auth', 'pug.map'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      controller: 'AuthController',
      templateUrl: 'views/login.html'
    })
    .state('signup', {
      url: '/signup',
      controller: 'AuthController',
      templateUrl: 'views/signup.html'
    })
    .state('intro', {
      url: '/intro',
      templateUrl: 'views/intro.html'
    })
    .state('creatingEvent', {
      url: '/creatingEvent',
      templateUrl: 'views/creatingEvent.html'
    })
    .state('map', {
      url: '/map',
      controller: 'MapController',
      templateUrl: 'views/map.html'
    });
  $urlRouterProvider.otherwise('/intro');
});