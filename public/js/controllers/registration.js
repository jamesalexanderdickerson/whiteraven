(function() {
  var RegistrationController;

  RegistrationController = angular.module('RegistrationController', ['firebase']);

  RegistrationController.controller('RegistrationController', [
    '$scope', 'Auth', 'currentAuth', '$location', '$firebaseObject', function($scope, Auth, currentAuth, $location, $firebaseObject) {
      $scope.displayName = null;
      $scope.auth = Auth;
      $scope.auth.$onAuth(function(authData) {
        var currentUser, userRef;
        $scope.authData = authData;
        if (authData && !authData.facebook) {
          console.log(authData);
          userRef = new Firebase('https://myappdatabase1.firebaseio.com/users/' + authData.uid);
          currentUser = $firebaseObject(userRef);
          return currentUser.$loaded().then(function() {
            return $scope.displayName = currentUser.firstname + " " + currentUser.lastname;
          });
        }
      });
      $scope.facebookLogin = (function(_this) {
        return function() {
          return Auth.$authWithOAuthPopup('facebook').then(function(userData) {
            return $scope.displayName = userData.facebook.displayName;
          });
        };
      })(this);
      $scope.logout = function() {
        $scope.displayName = null;
        return Auth.$unauth();
      };
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
          var regRef;
          regRef = new Firebase('https://myappdatabase1.firebaseio.com/users').child(userData.uid).set({
            date: Firebase.ServerValue.TIMESTAMP,
            regUser: userData.uid,
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            email: $scope.user.email
          });
          $scope.message = 'User created with uid ' + userData.uid;
          $scope.firstname = userData.firstname;
          $scope.lastname = userData.lastname;
          return $location.path('/');
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
