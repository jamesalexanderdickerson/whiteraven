GalleryController = angular.module 'GalleryController' , ['firebase']

GalleryController.controller 'GalleryController', ['$scope','Auth', 'currentAuth', 'UserService', '$location', ($scope, Auth, currentAuth, UserService, $location) ->
  user = UserService
  $scope.displayName = UserService.displayName
  $scope.imgsrc = UserService.imgsrc
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


  $scope.logout = () ->
    $scope.displayName = UserService
    $scope.imgsrc = null
    UserService.imgsrc = null
    Auth.$unauth()
    $location.path '/login'

  $scope.message = 'Welcome to the gallery!'

]
