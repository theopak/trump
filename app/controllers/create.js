// http://developer.appcelerator.com/question/93681/how-do-i-set-a-back-button-background-image-and-onclick-background-image#answer-168801


$.submit.addEventListener("touchstart",  function(){$.submit.backgroundColor = "#9CC075";});
//$.submit.addEventListener("touchend",    function(){$.submit.backgroundColor = "#7C9A5B";});
$.submit.addEventListener("touchcancel", function(){$.submit.backgroundColor = "#7C9A5B";});

$.submit.addEventListener("touchend", function(e){
	Ti.API.info("Pressed button: Invite.");
	$.submit.backgroundColor = "#7C9A5B";
	Ti.App.fireEvent('app:createGame', {friends: $.friends.value.split(',')});
});
