RegistrationController = angular.module 'RegistrationController' , ['firebase']

RegistrationController.factory "Auth", ["$firebaseAuth", ($firebaseAuth) ->
  db = new Firebase 'https://myappdatabase1.firebaseio.com/user'
  $firebaseAuth(db)
]

RegistrationController.controller 'RegistrationController', ['$scope','Auth', 'currentAuth', ($scope, Auth, currentAuth) ->
  $scope.auth = Auth
  $scope.auth.$onAuth (authData) ->
    $scope.authData = authData

  $scope.login = () ->
    # $scope.authData = null
    $scope.error = null

    Auth.$authWithPassword({
      email: $scope.user.email,
      password: $scope.user.password
      }).then((authData) ->
        console.log "Logged in as: ", authData.uid
        console.log authData.password.email
        if authData.facebook.displayName then $scope.user.email = authData.facebook.displayName else $scope.user.email = authData.password.email
        ).catch((error) ->
          console.error "Authentication failed: ", error
          )

  $scope.createUser = () ->
    $scope.message = null
    $scope.error = null

    Auth.$createUser({
      email: $scope.email,
      password: $scope.password,
      firstname: $scope.firstname,
      lastname: $scope.lastname
      }).then (userData) ->
        $scope.message = 'User created with uid ' + userData.uid
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
