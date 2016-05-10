RegistrationController = angular.module 'RegistrationController' , ['firebase']

RegistrationController.controller 'RegistrationController', ['$scope','Auth', 'currentAuth', '$location', '$firebaseObject', ($scope, Auth, currentAuth, $location, $firebaseObject) ->
  $scope.displayName = null
  $scope.auth = Auth
  $scope.auth.$onAuth (authData) ->
    $scope.authData = authData
    if authData && !authData.facebook
      console.log authData
      userRef = new Firebase 'https://myappdatabase1.firebaseio.com/users/' + authData.uid
      currentUser = $firebaseObject(userRef)
      currentUser.$loaded().then(() ->
        $scope.displayName = currentUser.firstname + " " + currentUser.lastname
        )

  $scope.facebookLogin = () =>
    Auth.$authWithOAuthPopup('facebook').then((userData) ->
      $scope.displayName = userData.facebook.displayName
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
      }).catch((error) ->
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
        regRef = new Firebase('https://myappdatabase1.firebaseio.com/users')
          .child(userData.uid).set({
            date: Firebase.ServerValue.TIMESTAMP,
            regUser: userData.uid,
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            email: $scope.user.email
            })
        $scope.message = 'User created with uid ' + userData.uid
        $scope.firstname = userData.firstname
        $scope.lastname = userData.lastname
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
