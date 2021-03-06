(function() {
  var myApp;

  myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'RegistrationController', 'GalleryController', 'LiveChatController', 'firebase']);

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

  myApp.factory("UserService", function() {
    var user;
    user = {};
    user.displayName = "Comic Fan";
    user.imgsrc = null;
    user.ChangeName = function(value) {
      return user.displayName = value;
    };
    user.ChangeImg = function(value) {
      return user.imgsrc = value;
    };
    return user;
  });

  myApp.factory("Messages", [
    "$firebaseArray", "$firebaseObject", "UserService", function($firebaseArray, $firebaseObject, UserService) {
      var Message, db, messages;
      db = new Firebase('https://myappdatabase1.firebaseio.com/messages/');
      messages = $firebaseArray(db);
      Message = {
        all: messages,
        create: function(message) {
          message.displayName = UserService.displayName;
          return messages.$add(message);
        },
        get: function(messageId) {
          return $firebaseObject(db.child(messageId));
        },
        "delete": function(message) {
          return messages.$remove(message);
        }
      };
      return Message;
    }
  ]);

  myApp.factory("VidService", [
    "$firebaseObject", function($firebaseObject) {
      var db, vidstream;
      db = new Firebase('https://myappdatabase1.firebaseio.com/vidservice/');
      vidstream = $firebaseObject(db);
      return {
        show: vidstream,
        vid_on: function() {
          vidstream.status = 'on';
          return vidstream.$save();
        },
        vid_off: function() {
          vidstream.status = 'off';
          return vidstream.$save();
        }
      };
    }
  ]);

  myApp.directive('ngScrollBottom', [
    '$timeout', function($timeout) {
      return {
        scope: {
          ngScrollBottom: '='
        },
        link: function($scope, $element) {
          $scope.$watchCollection('ngScrollBottom', function(newValue) {
            if (newValue) {
              $timeout((function() {
                $element[0].scrollTop = $element[0].scrollHeight;
              }), 0);
            }
          });
        }
      };
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
        controller: 'RegistrationController',
        resolve: {
          "currentAuth": [
            "Auth", function(Auth) {
              return Auth.$waitForAuth();
            }
          ]
        }
      }).when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'RegistrationController',
        resolve: {
          "currentAuth": [
            "Auth", function(Auth) {
              return Auth.$waitForAuth();
            }
          ]
        }
      }).when('/live', {
        templateUrl: 'views/live.html',
        controller: 'LiveChatController',
        resolve: {
          "currentAuth": [
            "Auth", function(Auth) {
              return Auth.$waitForAuth();
            }
          ]
        }
      }).when('/gallery', {
        templateUrl: 'views/gallery.html',
        controller: 'GalleryController',
        resolve: {
          "currentAuth": [
            "Auth", function(Auth) {
              return Auth.$waitForAuth();
            }
          ]
        }
      }).when('/', {
        templateUrl: 'views/main.html',
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
