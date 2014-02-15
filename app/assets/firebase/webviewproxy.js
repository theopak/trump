var firebase = new Firebase("https://trump.firebaseio.com/");

var auth = new FirebaseSimpleLogin(firebase, function (error, user) {
	alert(user);
});

/* FIRE EVENTS */
something.on('value', function (gamedata) {
	Ti.App.fireEvent('app:gameListChanged', { games: gamedata.val().games });
});


/* LISTEN FOR EVENTS */
Ti.App.addEventListener('app:fbAuthed', function (e) {
	auth.login('facebook', {
		access_token: e.access_token
	});
});