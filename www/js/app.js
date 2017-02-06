// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives', 'app.services','ngMask']);


app.run(function ($rootScope, $ionicPlatform, $ionicPopover, $location, $ionicPopup, $stateParams, $state, $ionicHistory, $filter, APIService, AppFactory) {
  $rootScope.$ionicHistory = $ionicHistory;
  $rootScope.$state = $state;
  $rootScope.$ionicPopup = $ionicPopup;
  $rootScope.$stateParams = $stateParams;
  $rootScope.$filter = $filter;
  $rootScope.APIService = APIService;
  $rootScope.AppFactory = AppFactory;

  $ionicPlatform.registerBackButtonAction(function () {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Confirmation',
      template: "Are you sure you wan't to exit app?"
    });
    confirmPopup.then(function (res) {
      if (res) {
        navigator.app.exitApp();
      } else {
        console.log('You are not sure');
      }
    });
  }, 100);
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.Connection) {
      if (navigator.connection.type == Connection.NONE) {
        $ionicPopup.alert({
          title: "Internet Disconnected",
          content: "The internet is disconnected on your device."
        });
      }
    }
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    
  });
  if (API.storage.isLoggedIn()) {
    $location.path('app/Home');
  }
  else {
    $location.path('login');
  }
});