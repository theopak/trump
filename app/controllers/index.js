function doClick(e) {
        alert($.label.text);
}
    
$.index.open();

var win = $.index;

Ti.App.addEventListener('app:proxyViewLoaded',function(){
    Ti.App.addEventListener('app:gameListChanged', function(e) {
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
    fb.permissions = ['email', 'user_likes', 'publish_stream'];
    fb.forceDialogAuth = true;
    
    fb.addEventListener('login', function(e) {
        if (e.success) {
        	Ti.App.fireEvent('app:fbAuthed', {access_token: fb.getAccessToken()});
        } else if (e.error) {
            alert(e.error);
        } else if (e.cancelled) {
    	    alert("You don't want to give permission? :('");
        }
    });
    if (!fb.loggedIn) {
        fb.authorize();
    }
    else
    {
        Ti.App.fireEvent("app:fbAuthed",{access_token:fb.accessToken});
    }
    Ti.App.addEventListener("app:playerWonRound",function(e)
        {
            // Now create the status message after you've confirmed that authorize() succeeded
            fb.dialog('feed', {caption: "I just won a round of Trump with this card: ",link: e.winning_url}, 
              function(e) {
                if (e.success) {
                    alert("Thank you for your support!");
                } else {
                    if (e.error) {
                        alert(e.error);
                    } else {
                        alert("Cancelled");
                    }
                }
            });    
        });
});
if(OS_IOS)
{
    $.webviewproxy.url = "firebase/webviewproxy.html";
}
else
{
    $.webviewproxy.url = "../../firebase/webviewproxy.html";
}
