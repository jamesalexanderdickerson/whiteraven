(function() {
  var myApp;

  myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'RegistrationController', 'SuccessController', 'firebase']);

  myApp.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/login', {
        templateUrl: 'views/login.html',
        controller: 'RegistrationController'
      }).when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationController'
      }).when('/success', {
        templateUrl: 'views/success.html',
        controller: 'SuccessController'
      }).otherwise({
        redirectTo: '/login'
      });
    }
  ]);

}).call(this);
