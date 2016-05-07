# myConsole = 'Javascript is running!'
# console.log '%c' + myConsole, 'background-color:#0058ff; color:#a7e03b; border-radius: 5px; padding: 5px'

myApp = angular.module 'myApp', ['ngRoute', 'ngAnimate', 'RegistrationController', 'SuccessController', 'firebase']

myApp.run ["$rootScope", "$location", ($rootScope, $location) ->
  $rootScope.$on "$routeChangeError", (event, next, previous, error) ->
    $location.path "/login" if error == "AUTH_REQUIRED"
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
      controller: 'RegistrationController'
      })
    .when('/success', {
      templateUrl: 'views/success.html'
      controller: 'SuccessController',
      resolve: {
        "currentAuth": ["Auth", (Auth) ->
          Auth.$requireAuth()
        ]
      }
      })
    .otherwise({
      redirectTo: '/login'
      })
  ]
