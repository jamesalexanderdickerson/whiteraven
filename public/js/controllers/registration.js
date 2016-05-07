(function() {
  var RegistrationController;

  RegistrationController = angular.module('RegistrationController', ['firebase']);

  RegistrationController.factory("Auth", [
    "$firebaseAuth", function($firebaseAuth) {
      var db;
      db = new Firebase('https://myappdatabase1.firebaseio.com/user');
      return $firebaseAuth(db);
    }
  ]);

  RegistrationController.controller('RegistrationController', [
    '$scope', 'Auth', 'currentAuth', function($scope, Auth, currentAuth) {
      $scope.auth = Auth;
      $scope.auth.$onAuth(function(authData) {
        return $scope.authData = authData;
      });
      $scope.login = function() {
        $scope.error = null;
        return Auth.$authWithPassword({
          email: $scope.user.email,
          password: $scope.user.password
        }).then(function(authData) {
          console.log("Logged in as: ", authData.uid);
          console.log(authData.password.email);
          if (authData.facebook.displayName) {
            return $scope.user.email = authData.facebook.displayName;
          } else {
            return $scope.user.email = authData.password.email;
          }
        })["catch"](function(error) {
          return console.error("Authentication failed: ", error);
        });
      };
      $scope.createUser = function() {
        $scope.message = null;
        $scope.error = null;
        return Auth.$createUser({
          email: $scope.email,
          password: $scope.password,
          firstname: $scope.firstname,
          lastname: $scope.lastname
        }).then(function(userData) {
          return $scope.message = 'User created with uid ' + userData.uid;
        })["catch"](function(error) {
          return $scope.error = error;
        });
      };
      $scope.removeUser = function() {
        $scope.message = null;
        $scope.error = null;
        return Auth.$removeUser({
          email: $scope.email,
          password: $scope.password
        }).then(function() {
          return $scope.message = 'User removed';
        })["catch"](function(error) {
          return $scope.error = error;
        });
      };
      return $scope.message = 'Enter in your login credentials';
    }
  ]);

}).call(this);
