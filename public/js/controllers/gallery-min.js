(function(){var e;e=angular.module("GalleryController",["firebase"]),e.controller("GalleryController",["$scope","Auth","currentAuth","UserService","$location",function(e,a,r,t,l){var n;return n=t,e.displayName=t.displayName,e.imgsrc=t.imgsrc,e.auth=a,e.auth.$onAuth(function(a){var r,l;return e.authData=a,a&&!a.facebook?(l=new Firebase("https://myappdatabase1.firebaseio.com/users/"+a.uid),r=$firebaseObject(l),r.$loaded().then(function(){return t.ChangeName(r.firstname+" "+r.lastname),e.displayName=t.displayName})):void 0}),e.logout=function(){return e.displayName=t,e.imgsrc=null,t.imgsrc=null,a.$unauth(),l.path("/login")},e.message="Welcome to the gallery!"}])}).call(this);