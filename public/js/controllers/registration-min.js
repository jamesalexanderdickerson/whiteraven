(function(){var e;e=angular.module("RegistrationController",["firebase"]),e.factory("Auth",["$firebaseAuth",function(e){var r;return r=new Firebase("https://myappdatabase1.firebaseio.com"),e(r)}]),e.controller("RegistrationController",["$scope","Auth",function(e,r){return e.auth=r,e.auth.$onAuth(function(r){return e.authData=r}),e.createUser=function(){return e.message=null,e.error=null,r.$createUser({email:e.email,password:e.password,firstname:e.firstname,lastname:e.lastname}).then(function(r){return e.message="User created with uid "+r.uid})["catch"](function(r){return e.error=r})},e.removeUser=function(){return e.message=null,e.error=null,r.$removeUser({email:e.email,password:e.password}).then(function(){return e.message="User removed"})["catch"](function(r){return e.error=r})},e.message="Enter in your login credentials"}])}).call(this);