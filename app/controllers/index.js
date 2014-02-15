$.index.open();

var win = $.index;
Ti.App.addEventListener('app:webviewproxyDidLoad',function(){
    // load the facebook module
    var fb = require('facebook');
    fb.appid = 259836610857049;
    fb.permissions = ['email', 'user_likes'];
    
    // check to see if our auth token is valid.  Seriously, this is the way to do it...
    // https://developers.facebook.com/blog/post/2011/05/13/how-to--handle-expired-access-tokens/
    fb.requestWithGraphPath("me",{access_token:fb.getAccessToken()},"GET",function(e)
    {
        if(e.success){
            // our access token is still valid.  Phew...
        }else{
            // we need to re-authorize.  Darn
            fb.logout();
            fb.authorize();
        }
        // at this point we are guaranteed to be authenticated with facebook
        fb.addEventListener('login', function(e) {
            if (e.success) {
                Ti.App.fireEvent('app:fbAuthed', {access_token: fb.getAccessToken()});
            } else if (e.error) {
                alert(e.error);
            } else if (e.cancelled) {
                var dialog = Ti.UI.createAlertDialog({
                    message: 'Sorry, you must connect to facebook in order to play Trump',
                    ok: 'Okay',
                    title: 'Sign-in required'
                    });
                dialog.addEventListener("click",function(e){fb.authorize();});
                dialog.show();
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

});
if(OS_IOS)
{
    $.webviewproxy.url = "firebase/webviewproxy.html";
}
else
{
    $.webviewproxy.url = "../../firebase/webviewproxy.html";
}

function newGame(e)
{
	Ti.API.info("****hi****");
}

// Create a custom template that displays an image on the left, 
// then a title next to it with a subtitle below it.
var myTemplate = {
    childTemplates: [
        {                            // Image justified left
            type: 'Ti.UI.ImageView', // Use an image view for the image
            bindId: 'pic',           // Maps to a custom pic property of the item data
            properties: {            // Sets the image view  properties
                width: '50dp', height: '50dp', left: 10,
                borderRadius: '25dp', borderWidth: '1px',
                borderColor: "#000"
            }
        },
        {                            // Title 
            type: 'Ti.UI.Label',     // Use a label for the title 
            bindId: 'info',          // Maps to a custom info property of the item data
            properties: {            // Sets the label properties
                color: 'black',
                font: { fontFamily:'Arial', fontSize: '20dp', fontWeight:'bold' },
                left: '70dp', top: 15,
            }
        },
        {                            // Subtitle
            type: 'Ti.UI.Label',     // Use a label for the subtitle
            bindId: 'es_info',       // Maps to a custom es_info property of the item data
            properties: {            // Sets the label properties
                color: 'gray',
                font: { fontFamily:'Arial', fontSize: '14dp' },
                left: '70dp', top: '40dp',
            }
        },
        {
        	type: 'Ti.UI.View',
        	bindId: 'spacer',
        	properties: {
        		backgroundColor: '#ccc',
        		height: '1px',
        		top: 79
        	}
        },
        {
        	type: 'Ti.UI.ImageView',
        	bindId: 'arrow',
        	properties: {
        		image: 'line.png',
        		right: 10
        	}
        }
    ]
};

var listView = Ti.UI.createListView({
    // Maps myTemplate dictionary to 'template' string
    templates: { 'template': myTemplate },
    // Use 'template', that is, the myTemplate dict created earlier
    // for all items as long as the template property is not defined for an item.
    defaultItemTemplate: 'template'
});

Ti.App.addEventListener('app:gameListChanged', function(e) {
	var sections = [];
	var games = e.games;
	var gamesList = Ti.UI.createListSection({ id: 'gamesList'});
	var gameDataSet = [];
    for (var i = 0; i < games.length; i++)
    {
	    gameDataSet.push({ info: {text: games[i].adjective}, participants: {text: games[i].participants.join(', ')}, pic: {image: 'apple.jpg'}, properties: {height: 80}});
    }
    gamesList.setItems(gameDataSet);
	
	sections.push(gamesList);
	
	listView.setSections(sections);
	listView.separatorStyle = 0;
	
	$.main.add(listView);
});

Ti.App.addEventListener('app:webviewproxyDidLoad', function (e) {
	Ti.App.fireEvent('app:createGame', {friends: [0]});
});

if(OS_IOS)
{
    listView.separatorStyle = 0;
}
$.main.add(listView);

// newview = Alloy.createController("create").getView();
// 
// var animation = require('alloy/animation');
// animation.slideLeft($.index, newview, 500, function (event) {});

