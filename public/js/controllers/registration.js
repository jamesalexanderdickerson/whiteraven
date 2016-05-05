(function() {
  var RegistrationController;

  RegistrationController = angular.module('RegistrationController', ['firebase']);

  RegistrationController.factory("Auth", [
    "$firebaseAuth", function($firebaseAuth) {
      var db;
      db = new Firebase('https://myappdatabase1.firebaseio.com');
      return $firebaseAuth(db);
    }
  ]);

  RegistrationController.controller('RegistrationController', [
    '$scope', 'Auth', function($scope, Auth) {
      $scope.auth = Auth;
      $scope.auth.$onAuth(function(authData) {
        return $scope.authData = authData;
      });
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
