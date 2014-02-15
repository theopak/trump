$.submit.addEventListener("touchend", function(e){
	Ti.API.info("Pressed button: Invite.");
	Ti.App.fireEvent('app:createGame', {friends: $.friends.value.split(',')});
});