myApp.factory "Messages", ["$rootScope", "$firebaseObj", ($rootScope, $firebaseObj) ->
  db = new Firebase 'https://myappdatabase1.firebaseio.com/'
  $firebaseObj(db)
]
