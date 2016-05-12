# myConsole = 'Javascript is running!'
# console.log '%c' + myConsole, 'background-color:#0058ff; color:#a7e03b; border-radius: 5px; padding: 5px'

myApp = angular.module 'myApp', ['ngRoute', 'ngAnimate', 'RegistrationController', 'SuccessController', 'firebase']

myApp.run ["$rootScope", "$location", ($rootScope, $location) ->
  $rootScope.$on "$routeChangeError", (event, next, previous, error) ->
    $location.path "/" if error == "AUTH_REQUIRED"
]

myApp.factory "Auth", ["$firebaseAuth", ($firebaseAuth) ->
  db = new Firebase 'https://myappdatabase1.firebaseio.com'
  $firebaseAuth(db)
]

myApp.factory "User", ["$rootScope", ($rootScope) ->
  service = {
    displayName: '',
    SaveState: () ->
      sessionStorage.User.service.displayName = service.displayName

    RestoreState: () ->
      service.displayName = sessionStorage.User.service.displayName
  }
]


myApp.factory "Messages", ["$firebaseObj", ($firebaseObj) ->
  db = new Firebase 'https://myappdatabase1.firebaseio.com/'
  $firebaseObj(db)
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
    .when('/success', {
      templateUrl: 'views/success.html',
      controller: 'SuccessController',
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
