LiveChatController= angular.module 'LiveChatController' , ['firebase']

LiveChatController.controller 'LiveChatController', ['$scope', 'Auth', 'currentAuth', 'UserService', 'Messages', '$location', '$firebaseObject', 'VidService', ($scope, Auth, currentAuth, UserService, Messages, $location, $firebaseObject, VidService) ->
  user = UserService
  $scope.vidstream = VidService.show
  $scope.btn_checked_on = false
  $scope.id = ''
  $scope.displayName = UserService.displayName
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
    if authData.facebook
      $scope.id = authData.facebook.id

  $scope.sendMsg = (message) ->
    Messages.create(message)
    $scope.chat.message = ""

  $scope.delMsg = (message) ->
    Messages.delete(message)

  $scope.vidstream_on = () ->
    VidService.vid_on()
    $scope.btn_checked_on = false

  $scope.vidstream_off = () ->
    VidService.vid_off()
    $scope.btn_checked_on = true

  $scope.logout = () ->
    $scope.displayName = UserService
    UserService.imgsrc = null
    $scope.imgsrc = UserService.imgsrc
    $scope.id = ''
    Auth.$unauth()
    $location.path '/login'

  $scope.message = 'Welcome to the live event!'

]
