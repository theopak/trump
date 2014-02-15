function doClick(e) {
    alert($.label.text);
}

$.index.open();


Ti.App.addEventListener('app:fromWebView', function(e) {
    var games = e.games;
    var lalala = [];
    for (var i = 0; i < games.length; i++)
    {
	    lalala.push({properties: { title: games[i]}});
    }
    $.gamesList.setItems(lalala);
});

 var fb = require('facebook');
 fb.appid = 259836610857049;
 fb.permissions = ['email', 'user_likes'];
 
 fb.addEventListener('login', function(e) {
    if (e.success) {
    	Ti.App.fireEvent('app:fbAuthed', {access_token: fb.getAccessToken()});
    } else if (e.error) {
        alert(e.error);
    } else if (e.cancelled) {
		alert("You don't want to give permission? :('");
    }
});

 fb.authorize();
