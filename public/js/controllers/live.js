(function() {
  var LiveChatController;

  LiveChatController = angular.module('LiveChatController', ['firebase']);

  LiveChatController.controller('LiveChatController', [
    '$scope', 'Auth', 'currentAuth', 'UserService', 'Messages', '$location', function($scope, Auth, currentAuth, UserService, Messages, $location) {
      var chat, user;
      user = UserService;
      chat = {};
      $scope.displayName = UserService.displayName;
      chat.displayName = UserService.displayName;
      $scope.messages = Messages.all;
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
      $scope.sendMsg = function(message) {
        return Messages.create(message);
      };
      $scope.logout = function() {
        $scope.displayName = UserService;
        $scope.imgsrc = null;
        UserService.imgsrc = null;
        Auth.$unauth();
        return $location.path('/login');
      };
      return $scope.message = 'Welcome to the live event!';
    }
  ]);

}).call(this);
