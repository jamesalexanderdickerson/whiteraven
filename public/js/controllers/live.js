(function() {
  var LiveChatController;

  LiveChatController = angular.module('LiveChatController', ['firebase']);

  LiveChatController.controller('LiveChatController', [
    '$scope', 'Auth', 'currentAuth', 'UserService', 'Messages', '$location', '$firebaseObject', 'VidService', function($scope, Auth, currentAuth, UserService, Messages, $location, $firebaseObject, VidService) {
      var user;
      user = UserService;
      $scope.btn_checked_on = false;
      $scope.id = '';
      $scope.vidstream = VidService.show.status;
      console.log(VidService.show.status);
      $scope.displayName = UserService.displayName;
      $scope.messages = Messages.all;
      $scope.imgsrc = UserService.imgsrc;
      $scope.auth = Auth;
      $scope.auth.$onAuth(function(authData) {
        var currentUser, userRef;
        $scope.authData = authData;
        if (authData && !authData.facebook) {
          userRef = new Firebase('https://myappdatabase1.firebaseio.com/users/' + authData.uid);
          currentUser = $firebaseObject(userRef);
          currentUser.$loaded().then(function() {
            UserService.ChangeName(currentUser.firstname + " " + currentUser.lastname);
            return $scope.displayName = UserService.displayName;
          });
        }
        if (authData.facebook) {
          return $scope.id = authData.facebook.id;
        }
      });
      $scope.sendMsg = function(message) {
        Messages.create(message);
        return $scope.chat.message = "";
      };
      $scope.delMsg = function(message) {
        return Messages["delete"](message);
      };
      $scope.vidstream_on = function() {
        VidService.vid_on();
        return $scope.btn_checked_on = false;
      };
      $scope.vidstream_off = function() {
        VidService.vid_off();
        return $scope.btn_checked_on = true;
      };
      $scope.logout = function() {
        $scope.displayName = UserService;
        UserService.imgsrc = null;
        $scope.imgsrc = UserService.imgsrc;
        $scope.id = '';
        Auth.$unauth();
        return $location.path('/login');
      };
      return $scope.message = 'Welcome to the live event!';
    }
  ]);

}).call(this);
