RegistrationController = angular.module 'RegistrationController' , ['firebase']

RegistrationController.controller 'RegistrationController', ['$scope','Auth', 'currentAuth', '$location', '$firebaseObject', 'UserService', ($scope, Auth, currentAuth, $location, $firebaseObject, UserService) ->
  user = UserService
  $scope.displayName = UserService.displayName
  $scope.auth = Auth
  $scope.auth.$onAuth (authData) ->
    $scope.authData = authData
    if authData && !authData.facebook
      userRef = new Firebase 'https://myappdatabase1.firebaseio.com/users/' + authData.uid
      currentUser = $firebaseObject(userRef)
      currentUser.$loaded().then(() ->
        UserService.ChangeName(currentUser.firstname + " " + currentUser.lastname)
        $scope.displayName = UserService.displayName
        )

  $scope.facebookLogin = () =>
    user = UserService
    Auth.$authWithOAuthPopup('facebook').then((userData) ->
      UserService.ChangeName(userData.facebook.displayName)
      $scope.displayName = UserService.displayName
    )

  $scope.logout = () ->
    $scope.displayName = UserService
    Auth.$unauth()
    $location.path '/login'

  $scope.login = () ->
    $scope.message = null
    $scope.error = null
    email = $scope.user.email
    password = $scope.user.password
    $scope.error = null

    Auth.$authWithPassword({
      email: email
      password: password
      }).catch((error) ->
          $scope.error = error
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
        regRef = new Firebase('https://myappdatabase1.firebaseio.com/users')
          .child(userData.uid).set({
            date: Firebase.ServerValue.TIMESTAMP,
            regUser: userData.uid,
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            email: $scope.user.email
            })
        $scope.login();
        $location.path '/'
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
