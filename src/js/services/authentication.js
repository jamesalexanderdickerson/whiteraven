myApp.factory "Auth", ["$rootScope", "$firebaseAuth", ($rootScope, $firebaseAuth) ->
  db = new Firebase 'https://myappdatabase1.firebaseio.com'
  auth = $firebaseAuth(db)
  $rootScope.facebookLogin = () =>
    Auth.$authWithOAuthPopup('facebook').then((userData) ->
      $scope.displayName = userData.facebook.displayName
      console.log userData
    )

  $rootScope.logout = () ->
    $scope.displayName = null
    Auth.$unauth()

  $rootScope.login = () ->
    $rootScope.message = null
    $rootScope.error = null
    email = $rootScope.user.email
    password = $rootScope.user.password
    $rootScope.error = null

    Auth.$authWithPassword({
      email: email
      password: password
      }).then((userData) ->
        $rootScope.displayName = userData.password.email
        $rootScope.message = "You have successfully logged in!"
        ).catch((error) ->
          $rootScope.error = error
          console.log error
          )

  $rootScope.createUser = () ->
    $rootScope.message = null
    $rootScope.error = null

    Auth.$createUser({
      email: $rootScope.user.email,
      password: $rootScope.user.password,
      firstname: $rootScope.user.firstname,
      lastname: $rootScope.user.lastname
      }).then (userData) ->
        $rootScope.message = 'User created with uid ' + userData.uid
        $rootScope.firstname = userData.firstname
        $rootScope.lastname = userData.lastname
      .catch (error) ->
        $rootScope.error = error

  $rootScope.removeUser = () ->
    $rootScope.message = null
    $rootScope.error = null

    Auth.$removeUser({
      email: $rootScope.email,
      password: $rootScope.password
      }).then () ->
        $rootScope.message = 'User removed'
      .catch (error) ->
        $rootScope.error = error

]
