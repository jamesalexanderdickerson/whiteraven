RegistrationController = angular.module 'RegistrationController' , ['firebase']

RegistrationController.factory "Auth", ["$firebaseAuth", ($firebaseAuth) ->
  db = new Firebase 'https://myappdatabase1.firebaseio.com'
  $firebaseAuth(db)
]

RegistrationController.controller 'RegistrationController', ['$scope','Auth', ($scope, Auth) ->
  $scope.auth = Auth
  $scope.auth.$onAuth((authData) ->
    $scope.authData = authData
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
