/*
// http://developer.appcelerator.com/question/93681/how-do-i-set-a-back-button-background-image-and-onclick-background-image#answer-168801
var btnBack = new Ti.UI.createButton({
    backgroundImage:'back.png',
    backgroundSelectedImage:'back.png',
    width:80,height:25
});
var win = new Ti.UI.createWindow({
    url:'index.js',
    leftNavButton:btnBack
});
btnBack.addEventListener('click', function(){
    win.close();
});
*/

$.submit.addEventListener("touchstart",  function(){$.submit.backgroundColor = "#9CC075";});
//$.submit.addEventListener("touchend",    function(){$.submit.backgroundColor = "#7C9A5B";});
$.submit.addEventListener("touchcancel", function(){$.submit.backgroundColor = "#7C9A5B";});

$.submit.addEventListener("touchend", function(e){
	Ti.API.info("Pressed button: Invite.");
	$.submit.backgroundColor = "#7C9A5B";
	Ti.App.fireEvent('app:createGame', {friends: $.friends.value.split(',')});
});

// if this occurs too early then the text area is not fully built yet and therefore unfocusable.
$.friends.focus();