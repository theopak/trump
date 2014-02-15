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
        //$.gamesList.setItems(lalala);
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
        		image: 'arrow.png',
        		right: 10,
        		width: 40,
        		height: 70
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
var sections = [];

var gamesList = Ti.UI.createListSection({ id: 'gamesList'});
var gameDataSet = [
    // the text property of info maps to the text property of the title label
    // the text property of es_info maps to text property of the subtitle label
    // the image property of pic maps to the image property of the image view
    { info: {text: 'Boring'}, es_info: {text: 'Trevor, Dan, Theo'}, pic: {image: 'apple.jpg'}, properties: {height: 80}},
    { info: {text: 'Exciting'}, es_info: {text: 'Derek, Trevor, Dan'}, pic: {image: 'banana.jpg'}, properties: {height: 80}}
];
gamesList.setItems(gameDataSet);
sections.push(gamesList);



listView.setSections(sections);
if(OS_IOS)
{
    listView.separatorStyle = Titanium.UI.iPhone.ListViewSeparatorStyle.NONE;
}
$.main.add(listView);
