(function(){var e;e=angular.module("RegistrationController",["firebase"]),e.controller("RegistrationController",["$scope","Auth","currentAuth","$location","$firebaseObject","UserService",function(e,r,a,n,t,s){var u;return u=s,e.displayName=s.displayName,e.auth=r,e.auth.$onAuth(function(r){var a,n;return e.authData=r,r&&!r.facebook?(n=new Firebase("https://myappdatabase1.firebaseio.com/users/"+r.uid),a=t(n),a.$loaded().then(function(){return s.ChangeName(a.firstname+" "+a.lastname),e.displayName=s.displayName})):void 0}),e.facebookLogin=function(a){return function(){return u=s,r.$authWithOAuthPopup("facebook").then(function(r){return s.ChangeName(r.facebook.displayName),e.displayName=s.displayName})}}(this),e.logout=function(){return e.displayName=s,r.$unauth(),n.path("/login")},e.login=function(){var a,n;return e.message=null,e.error=null,a=e.user.email,n=e.user.password,e.error=null,r.$authWithPassword({email:a,password:n})["catch"](function(r){return e.error=r})},e.createUser=function(){return e.message=null,e.error=null,r.$createUser({email:e.user.email,password:e.user.password,firstname:e.user.firstname,lastname:e.user.lastname}).then(function(r){var a;return a=new Firebase("https://myappdatabase1.firebaseio.com/users").child(r.uid).set({date:Firebase.ServerValue.TIMESTAMP,regUser:r.uid,firstname:e.user.firstname,lastname:e.user.lastname,email:e.user.email}),e.login(),n.path("/")})["catch"](function(r){return e.error=r})},e.removeUser=function(){return e.message=null,e.error=null,r.$removeUser({email:e.email,password:e.password}).then(function(){return e.message="User removed"})["catch"](function(r){return e.error=r})},e.message="Enter in your login credentials"}])}).call(this);