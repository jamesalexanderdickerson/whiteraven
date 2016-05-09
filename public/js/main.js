(function() {
  var myApp;

  myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'RegistrationController', 'SuccessController', 'firebase']);

  myApp.run([
    "$rootScope", "$location", function($rootScope, $location) {
      return $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        if (error === "AUTH_REQUIRED") {
          return $location.path("/");
        }
      });
    }
  ]);

  myApp.factory("Auth", [
    "$firebaseAuth", function($firebaseAuth) {
      var db;
      db = new Firebase('https://myappdatabase1.firebaseio.com');
      return $firebaseAuth(db);
    }
  ]);

  myApp.factory("Messages", [
    "$firebaseObj", function($firebaseObj) {
      var db;
      db = new Firebase('https://myappdatabase1.firebaseio.com/');
      return $firebaseObj(db);
    }
  ]);

  myApp.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        templateUrl: 'views/login.html',
        controller: 'RegistrationController',
        resolve: {
          "currentAuth": [
            "Auth", function(Auth) {
              return Auth.$waitForAuth();
            }
          ]
        }
      }).when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegistrationController',
        resolve: {
          "currentAuth": [
            "Auth", function(Auth) {
              return Auth.$waitForAuth();
            }
          ]
        }
      }).otherwise({
        redirectTo: '/'
      });
    }
  ]);

}).call(this);
