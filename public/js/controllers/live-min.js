(function(){var e;e=angular.module("LiveChatController",["firebase"]),e.controller("LiveChatController",["$scope","Auth","currentAuth","UserService","Messages","$location","$firebaseObject",function(e,a,t,r,n,i,s){var o;return o=r,e.id="",e.displayName=r.displayName,e.messages=n.all,e.imgsrc=r.imgsrc,e.auth=a,e.auth.$onAuth(function(a){var t,n;return e.authData=a,a&&!a.facebook&&(n=new Firebase("https://myappdatabase1.firebaseio.com/users/"+a.uid),t=s(n),t.$loaded().then(function(){return r.ChangeName(t.firstname+" "+t.lastname),e.displayName=r.displayName})),a.facebook?e.id=a.facebook.id:void 0}),e.sendMsg=function(a){return n.create(a),e.chat.message=""},e.delMsg=function(e){return n["delete"](e)},e.logout=function(){return e.displayName=r,r.imgsrc=null,e.imgsrc=r.imgsrc,e.id="",a.$unauth(),i.path("/login")},e.message="Welcome to the live event!"}])}).call(this);