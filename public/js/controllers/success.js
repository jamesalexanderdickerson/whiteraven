(function() {
  var SuccessController;

  SuccessController = angular.module('SuccessController', ['firebase']);

  SuccessController.factory("Auth", [
    "$firebaseAuth", function($firebaseAuth) {
      var db;
      db = new Firebase('https://myappdatabase1.firebaseio.com');
      return $firebaseAuth(db);
    }
  ]);

  SuccessController.controller('SuccessController', [
    '$scope', 'currentAuth', function($scope, currentAuth) {
      return $scope.message = "Welcome to my App";
    }
  ]);

}).call(this);
