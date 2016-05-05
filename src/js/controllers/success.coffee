SuccessController = angular.module 'SuccessController' , []

SuccessController.controller 'SuccessController', ['$scope', ($scope) ->
  $scope.message = "Welcome to my App"
]
