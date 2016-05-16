# myConsole = 'Javascript is running!'
# console.log '%c' + myConsole, 'background-color:#0058ff; color:#a7e03b; border-radius: 5px; padding: 5px'

myApp = angular.module 'myApp', ['ngRoute', 'ngAnimate', 'RegistrationController', 'GalleryController', 'LiveChatController', 'firebase']

myApp.run ["$rootScope", "$location", ($rootScope, $location) ->
  $rootScope.$on "$routeChangeError", (event, next, previous, error) ->
    $location.path "/" if error == "AUTH_REQUIRED"
]

myApp.factory "Auth", ["$firebaseAuth", ($firebaseAuth) ->
  db = new Firebase 'https://myappdatabase1.firebaseio.com'
  $firebaseAuth(db)
]

myApp.factory "UserService", () ->
  user = {}
  user.displayName = "Comic Fan"
  user.imgsrc = null
  user.ChangeName = (value) ->
    user.displayName = value
  user.ChangeImg = (value) ->
    user.imgsrc = value
  return user


myApp.factory "Messages", ["$firebaseArray","$firebaseObject", "UserService", ($firebaseArray, $firebaseObject, UserService) ->
  db = new Firebase 'https://myappdatabase1.firebaseio.com/messages/'
  messages = $firebaseArray(db)
  Message = {
    all: messages,
    create: (message) ->
      message.displayName = UserService.displayName
      messages.$add(message)
    get: (messageId) ->
      $firebaseObject(db.child(messageId))
    delete: (message) ->
      messages.$remove(message)
  }
  return Message
]

myApp.factory "VidService", [($firebaseArray) ->
  vidstream = false
  Vidstream = {
    on: () ->
      vidstream = true
      console.log vidstream
    off: () ->
      vidstream = false
  }
]

myApp.config ['$routeProvider', ($routeProvider) ->
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html'
      controller: 'RegistrationController',
      resolve: {
        "currentAuth": ["Auth", (Auth) ->
          Auth.$waitForAuth()
        ]
      }
      })
    .when('/register', {
      templateUrl: 'views/register.html'
      controller: 'RegistrationController',
      resolve: {
        "currentAuth": ["Auth", (Auth) ->
          Auth.$waitForAuth()
        ]
      }
      })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'RegistrationController',
      resolve: {
        "currentAuth": ["Auth", (Auth) ->
          Auth.$waitForAuth()
        ]
      }
      })
    .when('/live', {
      templateUrl: 'views/live.html',
      controller: 'LiveChatController',
      resolve: {
        "currentAuth": ["Auth", (Auth) ->
          Auth.$waitForAuth()
        ]
      }
      })
    .when('/gallery', {
      templateUrl: 'views/gallery.html',
      controller: 'GalleryController',
      resolve: {
        "currentAuth": ["Auth", (Auth) ->
          Auth.$waitForAuth()
        ]
      }
      })
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'RegistrationController',
      resolve: {
        "currentAuth": ["Auth", (Auth) ->
          Auth.$waitForAuth()
        ]
      }
      })
    .otherwise({
      redirectTo: '/'
      })
  ]
