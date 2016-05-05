(function() {
  var SuccessController;

  SuccessController = angular.module('SuccessController', []);

  SuccessController.controller('SuccessController', [
    '$scope', function($scope) {
      return $scope.message = "Welcome to my App";
    }
  ]);

}).call(this);
