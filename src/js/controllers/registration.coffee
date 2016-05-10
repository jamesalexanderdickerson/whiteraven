RegistrationController = angular.module 'RegistrationController' , ['firebase']

RegistrationController.controller 'RegistrationController', ['$scope','Auth', 'currentAuth', ($scope, Auth, currentAuth) ->
  $scope.displayName = null
  $scope.auth = Auth
  $scope.auth.$onAuth (authData) ->
    $scope.authData = authData

  $scope.facebookLogin = () =>
    Auth.$authWithOAuthPopup('facebook').then((userData) ->
      $scope.displayName = userData.facebook.displayName
      console.log userData
    )

  $scope.logout = () ->
    $scope.displayName = null
    Auth.$unauth()

  $scope.login = () ->
    $scope.message = null
    $scope.error = null
    email = $scope.user.email
    password = $scope.user.password
    $scope.error = null

    Auth.$authWithPassword({
      email: email
      password: password
      }).then((userData) ->
        $scope.displayName = userData.password.email
        $scope.message = "You have successfully logged in!"
        ).catch((error) ->
          $scope.error = error
          console.log error
          )

  $scope.createUser = () ->
    $scope.message = null
    $scope.error = null

    Auth.$createUser({
      email: $scope.user.email,
      password: $scope.user.password,
      firstname: $scope.user.firstname,
      lastname: $scope.user.lastname
      }).then (userData) ->
        $scope.message = 'User created with uid ' + userData.uid
        $scope.firstname = userData.firstname
        $scope.lastname = userData.lastname
      .catch (error) ->
        $scope.error = error

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

  $scope.message = 'Enter in your login credentials'

]
