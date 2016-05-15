LiveChatController= angular.module 'LiveChatController' , ['firebase']

LiveChatController.controller 'LiveChatController', ['$scope','Auth', 'currentAuth', 'UserService', 'Messages', '$location', ($scope, Auth, currentAuth, UserService, Messages, $location) ->
  user = UserService
  chat = {}
  $scope.displayName = UserService.displayName
  chat.displayName = UserService.displayName
  $scope.messages = Messages.all
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

  $scope.sendMsg = (message) ->
    Messages.create(message)

  $scope.logout = () ->
    $scope.displayName = UserService
    $scope.imgsrc = null
    UserService.imgsrc = null
    Auth.$unauth()
    $location.path '/login'

  $scope.message = 'Welcome to the live event!'

]
