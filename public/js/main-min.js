(function(){var e;e=angular.module("myApp",["ngRoute","ngAnimate","RegistrationController","GalleryController","LiveChatController","firebase"]),e.run(["$rootScope","$location",function(e,r){return e.$on("$routeChangeError",function(e,t,n,o){return"AUTH_REQUIRED"===o?r.path("/"):void 0})}]),e.factory("Auth",["$firebaseAuth",function(e){var r;return r=new Firebase("https://myappdatabase1.firebaseio.com"),e(r)}]),e.factory("UserService",function(){var e;return e={},e.displayName="Comic Fan",e.imgsrc=null,e.ChangeName=function(r){return e.displayName=r},e.ChangeImg=function(r){return e.imgsrc=r},e}),e.factory("Messages",["$firebaseArray","$firebaseObject","UserService",function(e,r,t){var n,o,i;return o=new Firebase("https://myappdatabase1.firebaseio.com/messages/"),i=e(o),n={all:i,create:function(e){return e.displayName=t.displayName,i.$add(e)},get:function(e){return r(o.child(e))},"delete":function(e){return i.$remove(e)}}}]),e.factory("VidService",["$firebaseObject",function(e){var r,t;return r=new Firebase("https://myappdatabase1.firebaseio.com/vidservice/"),t=e(r),t.status="off",{show:t,vid_on:function(){return t.status="on",t.$save()},vid_off:function(){return t.status="off",t.$save()}}}]),e.config(["$routeProvider",function(e){return e.when("/login",{templateUrl:"views/login.html",controller:"RegistrationController",resolve:{currentAuth:["Auth",function(e){return e.$waitForAuth()}]}}).when("/register",{templateUrl:"views/register.html",controller:"RegistrationController",resolve:{currentAuth:["Auth",function(e){return e.$waitForAuth()}]}}).when("/contact",{templateUrl:"views/contact.html",controller:"RegistrationController",resolve:{currentAuth:["Auth",function(e){return e.$waitForAuth()}]}}).when("/live",{templateUrl:"views/live.html",controller:"LiveChatController",resolve:{currentAuth:["Auth",function(e){return e.$waitForAuth()}]}}).when("/gallery",{templateUrl:"views/gallery.html",controller:"GalleryController",resolve:{currentAuth:["Auth",function(e){return e.$waitForAuth()}]}}).when("/",{templateUrl:"views/main.html",controller:"RegistrationController",resolve:{currentAuth:["Auth",function(e){return e.$waitForAuth()}]}}).otherwise({redirectTo:"/"})}])}).call(this);