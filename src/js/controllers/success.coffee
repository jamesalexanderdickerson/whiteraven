SuccessController = angular.module 'SuccessController' , ['firebase']

SuccessController.factory "Auth", ["$firebaseAuth", ($firebaseAuth) ->
  db = new Firebase 'https://myappdatabase1.firebaseio.com'
  $firebaseAuth(db)
]

SuccessController.controller 'SuccessController', ['$scope', 'currentAuth', ($scope, currentAuth) ->
  $scope.message = "Welcome to my App"
]
