angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('login', {
    url: '/Login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
  })
  .state('signUp', {
    url: '/signUp',
        templateUrl: 'templates/signUp.html',
        controller: 'signUpCtrl'
  })  
  .state('app', {
    abstract:true,
    url: '/app',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })
   .state('app.home', {
    url: '/Home',
    views: {
      'side-menu': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })
  .state('app.history', {
    url: '/History',
    views: {
      'side-menu': {
        templateUrl: 'templates/history.html',
        controller: 'historyCtrl'
      }
    }
  });
$urlRouterProvider.otherwise('/Login');
});