(function() {
  var myApp;

  myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'RegistrationController', 'SuccessController', 'firebase']);

  myApp.run([
    "$rootScope", "$location", function($rootScope, $location) {
      return $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        if (error === "AUTH_REQUIRED") {
          return $location.path("/login");
        }
      });
    }
  ]);

  myApp.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/login', {
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
        controller: 'RegistrationController'
      }).when('/success', {
        templateUrl: 'views/success.html',
        controller: 'SuccessController',
        resolve: {
          "currentAuth": [
            "Auth", function(Auth) {
              return Auth.$requireAuth();
            }
          ]
        }
      }).otherwise({
        redirectTo: '/login'
      });
    }
  ]);

}).call(this);
