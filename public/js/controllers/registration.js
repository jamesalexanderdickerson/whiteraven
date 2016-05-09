(function() {
  var RegistrationController;

  RegistrationController = angular.module('RegistrationController', ['firebase']);

  RegistrationController.controller('RegistrationController', [
    '$scope', 'Auth', 'currentAuth', function($scope, Auth, currentAuth) {
      $scope.displayName = null;
      $scope.auth = Auth;
      $scope.auth.$onAuth(function(authData) {
        return $scope.authData = authData;
      });
      $scope.facebookLogin = (function(_this) {
        return function() {
          return Auth.$authWithOAuthPopup('facebook').then(function(userData) {
            $scope.displayName = userData.facebook.displayName;
            return console.log(userData);
          });
        };
      })(this);
      $scope.login = function() {
        var email, password;
        $scope.message = null;
        $scope.error = null;
        email = $scope.user.email;
        password = $scope.user.password;
        $scope.error = null;
        return Auth.$authWithPassword({
          email: email,
          password: password
        }).then(function(userData) {
          $scope.displayName = userData.password.email;
          return $scope.message = "You have successfully logged in!";
        })["catch"](function(error) {
          $scope.error = error;
          return console.log(error);
        });
      };
      $scope.createUser = function() {
        $scope.message = null;
        $scope.error = null;
        return Auth.$createUser({
          email: $scope.user.email,
          password: $scope.user.password,
          firstname: $scope.user.firstname,
          lastname: $scope.user.lastname
        }).then(function(userData) {
          $scope.message = 'User created with uid ' + userData.uid;
          $scope.firstname = userData.firstname;
          return $scope.lastname = userData.lastname;
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
