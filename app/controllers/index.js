//$.index.open();

// http://stackoverflow.com/a/15930390
//$.index.addEventListener('android:back', function(e) {
//    e.cancelBubble = true;
//    Ti.App.fireEvent('android_back_button');
//});

//var win = $.index;
//Alloy.createController('play');

var emptyStateView = Ti.UI.createView({
   	top: 300,		// Initialized far away and animated into place to 15
   	opacity: 0,		// Initialized transparent and animated to fully opaque state
	left: 10,
	right: 10,
   	height: 110,
	backgroundColor: "white",
	borderRadius: 4,
});
var emptyStateTitle = Ti.UI.createLabel({
	text: "Trump is a game for friends.",
	top: 15,
	left: 20,
	right: 20,
   	color: "black",
   	textAlign: "left",
   	font: {
		fontFamily: "Omnes-Regular",
		fontSize: 20
	},
});
var emptyStateBody = Ti.UI.createLabel({
	text: "tap the add button to get started with your first round",
	top: 45,
	left: 20,
	right: 20,
	textAlign: "left",
	   color: "black",
	   textAlign: "left",
	font: {
		fontFamily: "Omnes-ExtraLight",
		fontSize: 20
	},
});
emptyStateView.add(emptyStateTitle);
emptyStateView.add(emptyStateBody);

// If the user doesn't have any games, present an engaging empty state.
function displayEmptyState() {
	Ti.API.info("Displaying...");
	$.index.add(emptyStateView);
	emptyStateView.animate({
      	top: 80,
      	opacity: 1,
      	duration: 350,
      	curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
      });
}
		
		
Ti.App.addEventListener('app:webviewproxyDidLoad',function(){
    // load the facebook module
    var fb = require('facebook');
    fb.appid = 259836610857049;
    fb.permissions = ['email', 'user_likes'];
    
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
            dialog.addEventListener("click", function(e){fb.authorize();});
            dialog.show();
        }
    });
    
    Ti.App.addEventListener("app:fbAuthed",function(e){
        fb.requestWithGraphPath("me/friends", {access_token: fb.getAccessToken()}, "GET", function(e){
            var trump_friends = [];
            // e.result.forEach(function(friend){
//                                
            // });
        });
    });
    
    Ti.App.addEventListener("app:getFacebookFriends",function(mm){
        var friends = [];
        fb.requestWithGraphPath("me/friends",{access_token:fb.getAccessToken()},"GET",function(ret){
            var result = JSON.parse(ret.result);
            for(var i = 0; i < result.data.length; i++){
                friends.push(result.data[i].id);
            }
            Ti.App.fireEvent("app:gotFacebookFriends",{friend_ids:friends});
        });
    });
    
    Ti.App.addEventListener("app:playerWonRound",function(e){
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
    
    // check to see if our auth token is valid.  Seriously, this is the way to do it...
    // https://developers.facebook.com/blog/post/2011/05/13/how-to--handle-expired-access-tokens/
    fb.requestWithGraphPath("me", {access_token: fb.getAccessToken()}, "GET", function(e)
    {
        if(e.success){
            // our access token is still valid.  Phew...
            Ti.App.fireEvent("app:fbAuthed", {access_token: fb.accessToken});
        }else{
            // we need to re-authorize.  Darn
            fb.logout();
            fb.authorize();
        }

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

$.newGameButton.addEventListener('touchend', function(e) {
	Ti.API.info("Pressed button: new game.");
	if(!Titanium.Network.online) {
		alert("Network connection required.");
	} else {
		//var nextWindow = Alloy.createController('create').getView();
   		//$.window.openWindow(nextWindow);
		Alloy.createController('create').getView().open();
	}
});

// Create a custom template that displays an image on the left, 
// then a title next to it with a subtitle below it.
var myTemplate = {
    childTemplates: [
        {                            // Image justified left
            type: 'Ti.UI.ImageView', // Use an image view for the image
            bindId: 'pic',           // Maps to a custom pic property of the item data
            properties: {            // Sets the image view  properties
                width: '50dp', height: '50dp', left: 10,
                borderRadius: '25dp'
            }
        },
        {                            // Title 
            type: 'Ti.UI.Label',     // Use a label for the title 
            bindId: 'topic',          // Maps to a custom info property of the item data
            properties: {            // Sets the label properties
                color: '#575757',
                font: { fontFamily:'Proxima Nova', fontSize: '20dp', fontWeight:'bold' },
                left: '70dp', top: 15,
            }
        },
        {                            // Subtitle
            type: 'Ti.UI.Label',     // Use a label for the subtitle
            bindId: 'friends',       // Maps to a custom es_info property of the item data
            properties: {            // Sets the label properties
                color: '#575757',
                font: { fontFamily:'Omnes', fontSize: '16dp' },
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
        		right: 10,
        		height: 20
        	}
        }
    ],
    // Binds a callback to the click event, which catches events bubbled by the view subcomponents.
    events: {click: playMatch}
};

var listView = Ti.UI.createListView({
    // Maps myTemplate dictionary to 'template' string
    templates: { 'template': myTemplate },
    // Use 'template', that is, the myTemplate dict created earlier
    // for all items as long as the template property is not defined for an item.
    defaultItemTemplate: 'template'
});

var gamesList = Ti.UI.createListSection({ id: 'gamesList'});
Ti.App.addEventListener('app:gameListChanged', function(e) {
	Ti.API.info('gameListChanged');
	var sections = [];
	var games = e.games;
	Ti.API.info('games:'+games);
	if (games == null || games.length == 0) {
		displayEmptyState();
	}
	Ti.API.info('past');
	var gameDataSet = [];
	Ti.API.info("Number of games is "+Object.keys(games).length);
	for(var key in games){
	    games[key].participants_text = "";
	    for(var i = 0; i < games[key].participants.length;i++){
            games[key].participants_text += ", "+games[key].participants[i].name;	        
	    }
	    games[key].participants_text = games[key].participants_text.substring(2);
	}
    for (var key in games)
    {
	    gameDataSet.push({
	    	topic: {
	    		text: games[key].adjective.adjective.toUpperCase(),
	    		game_id: games[key].game_id
	    	},
	    	friends: {
	    		text: games[key].participants_text,
	    		game_id: games[key].game_id
	    	},
	    	pic: {
	    		image: "http://graph.facebook.com/"+games[key].judge+"/picture?width=100&height=100",
	    		game_id: games[key].game_id
	    	},
	    	properties: {
	    		height: 80
	    	}
	    });
    }
    
    gamesList.setItems(gameDataSet);
    
    if (games == null || games.length == 0) {
    	displayEmptyState();
    } else {
    	$.index.remove(emptyStateView);
    }
	
	sections.push(gamesList);
	
	listView.setSections(sections);

	if(OS_IOS) {
	    listView.separatorStyle = Titanium.UI.iPhone.ListViewSeparatorStyle.NONE;
	}
	
	$.main.add(listView);
	//Alloy.createController('play', {game: games[0]}).getView().open();
	//Ti.App.fireEvent('app:play', {game: games[0]});
	
});

	// Modified version of the `itemclick` event listener
	// Changes the item template rather than the list item's color property
	// http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.ListItem
	function playMatch(e) {
		Ti.API.info("playMatch() triggered: " + e);
    	var item = gamesList.getItemAt(e.itemIndex);

    	// //Ti.App.fireEvent('app:play', {game: e.source.game_id});
    	var game_id;
    	if(OS_ANDROID){
            game_id = item.pic.game_id;
        }else{
            game_id = e.source.game_id;         
        }
    	Alloy.createController('play', {game: game_id}).getView().open();

	}

Ti.App.addEventListener('app:webviewproxyDidLoad', function (e) {
	// Ti.App.fireEvent('app:createGame', {friends: [0]});
});

if(OS_IOS)
{
    listView.separatorStyle = 0;
}

$.index.open();

// newview = Alloy.createController("create").getView();
// 
// var animation = require('alloy/animation');
// animation.slideLeft($.index, newview, 500, function (event) {});

