(function(){var r;r=angular.module("myApp",["ngRoute","ngAnimate","RegistrationController","SuccessController","firebase"]),r.run(["$rootScope","$location",function(r,e){return r.$on("$routeChangeError",function(r,t,o,n){return"AUTH_REQUIRED"===n?e.path("/"):void 0})}]),r.factory("Auth",["$firebaseAuth",function(r){var e;return e=new Firebase("https://myappdatabase1.firebaseio.com"),r(e)}]),r.factory("Messages",["$firebaseObj",function(r){var e;return e=new Firebase("https://myappdatabase1.firebaseio.com/"),r(e)}]),r.config(["$routeProvider",function(r){return r.when("/",{templateUrl:"views/login.html",controller:"RegistrationController",resolve:{currentAuth:["Auth",function(r){return r.$waitForAuth()}]}}).when("/register",{templateUrl:"views/register.html",controller:"RegistrationController",resolve:{currentAuth:["Auth",function(r){return r.$waitForAuth()}]}}).otherwise({redirectTo:"/"})}])}).call(this);