(function() {
  var RegistrationController;

  RegistrationController = angular.module('RegistrationController', ['firebase']);

  RegistrationController.controller('RegistrationController', [
    '$scope', 'Auth', 'currentAuth', '$location', '$firebaseObject', 'UserService', function($scope, Auth, currentAuth, $location, $firebaseObject, UserService) {
      var user;
      user = UserService;
      $scope.displayName = UserService.displayName;
      $scope.imgsrc = UserService.imgsrc;
      $scope.auth = Auth;
      $scope.auth.$onAuth(function(authData) {
        var currentUser, userRef;
        $scope.authData = authData;
        if (authData && !authData.facebook) {
          userRef = new Firebase('https://myappdatabase1.firebaseio.com/users/' + authData.uid);
          currentUser = $firebaseObject(userRef);
          return currentUser.$loaded().then(function() {
            UserService.ChangeName(currentUser.firstname + " " + currentUser.lastname);
            return $scope.displayName = UserService.displayName;
          });
        }
      });
      $scope.facebookLogin = (function(_this) {
        return function() {
          user = UserService;
          return Auth.$authWithOAuthPopup('facebook', {
            remember: 'sessionOnly',
            scope: 'public_profile'
          }).then(function(userData) {
            var imgsrc, name;
            imgsrc = userData.facebook.profileImageURL;
            name = userData.facebook.cachedUserProfile.first_name + ' ' + userData.facebook.cachedUserProfile.last_name;
            UserService.ChangeName(name);
            UserService.ChangeImg(imgsrc);
            $scope.displayName = UserService.displayName;
            return $scope.imgsrc = UserService.imgsrc;
          });
        };
      })(this);
      $scope.logout = function() {
        $scope.displayName = UserService;
        $scope.imgsrc = '';
        UserService.imgsrc = '';
        Auth.$unauth();
        return $location.path('/login');
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
          return $scope.error = error;
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
          $scope.login();
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
