SuccessController = angular.module 'SuccessController' , ['firebase']

SuccessController.controller 'SuccessController', ['$scope','Auth', 'currentAuth', ($scope, Auth, currentAuth) ->
  $scope.displayName = null
  $scope.auth = Auth
  $scope.auth.$onAuth (authData) ->
    $scope.authData = authData
    $scope.displayName = authData.facebook.displayName || authData.password.email

  $scope.removeUser = () ->
    $scope.message = null
    $scope.error = null

    Auth.$removeUser({
      email: $scope.email,
      password: $scope.password
      }).then () ->
        $scope.message = 'User removed'
      .catch (error) ->
        $scope.error = error

  $scope.logout = () ->
    $scope.displayName = null
    Auth.$unauth()


  $scope.message = 'You have successfully logged in!!! Whoop Whoop!'

]
