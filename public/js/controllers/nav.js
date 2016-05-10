(function() {
  var NavController;

  NavController = angular.module('NavController', ['firebase']);

  NavController.controller('NavController', [
    '$scope', 'Auth', 'currentAuth', function($scope, Auth, currentAuth) {
      $scope.displayName = null;
      $scope.authData = null;
      $scope.auth = Auth;
      return $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
        return $scope.displayName = authData.facebook.displayName || authData.password.email;
      });
    }
  ]);

}).call(this);
