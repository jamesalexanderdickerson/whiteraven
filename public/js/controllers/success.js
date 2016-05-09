(function() {
  var SuccessController;

  SuccessController = angular.module('SuccessController', ['firebase']);

  SuccessController.controller('SuccessController', [
    '$scope', 'Auth', 'currentAuth', function($scope, Auth, currentAuth) {
      $scope.displayName = null;
      $scope.auth = Auth;
      $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
        return $scope.displayName = authData.facebook.displayName || authData.password.email;
      });
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
      return $scope.message = 'You have successfully logged in!!! Whoop Whoop!';
    }
  ]);

}).call(this);
