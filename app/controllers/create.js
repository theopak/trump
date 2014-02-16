// (?): https://developer.appcelerator.com/question/27291/button-inside-a-view---inside-a-tableviewrow
// (?): http://developer.appcelerator.com/question/124202/how-to-add-a-text-and-a-checkbox-on-a-tableviewrow
// My Data-array for Table-view
var checkboxArray = [];
var tableView;


// Disregard privacy standards; aquire friends.
Ti.App.fireEvent('app:requestFriendList');
Ti.App.addEventListener('app:friendListAcquired', function (message) {
	friends = message.friends;
	
	for (var i = 0; i < friends.length; i++) {
		checkboxArray.push({ hasCheck: false, title: friends[i].name, leftImage: 'http://graph.facebook.com/'+friends[i].id+'/picture?type=small', uid: friends[i].id });
	}
});


// Make a UI searchbar that filters the contents of a UI tableview.
var searchBar = Ti.UI.createSearchBar({
    showCancel: false,				// button on far right
    hintText: 'Invite friends...',  // placeholder text
    //prompt: "to: ",				// centered text above field
    top: 60,						// absolute position
    //bottom: 50,
    width: Ti.UI.FULL,
    minHeight: 35,
    barColor: 'white',
    color: 'black',
    //backgroundColor: "#fff",
    //tintColor: "black",
    //borderColor: "#444",
    //borderRadius: 0,
    //borderWidth: 1
});
var tableView = Ti.UI.createTableView({
    width: "100%",
    height: "100%",
    data: checkboxArray,
    search: searchBar,
    filterAttribute: 'title',     // http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.TableView-property-filterAttribute
    filterCaseInsensitive: true,  // Determines whether the search is case insensitive.
    color: "#444",
    font: {
		fontFamily: "Omnes-Regular",
		fontSize: 20
	},
	backgroundColor: "#F0F0F0",
    //searchHidden: true,		  // Set to true to hide the search field.
    //separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
    //separatorColor: "#fff"
});
$.main.add(tableView);


// Track checked items
// Hack: record hasCheck of all rows.
/*
// var rows = this.data[0].rows;
// for (var i = 0; i < rows.length; ++i)
    // rows[i].hasCheck = false;*/
var lastRowClicked;
tableView.addEventListener('click', function(e){
    var row = e.row;
    row.hasCheck = !row.hasCheck;
    if(row.hasCheck)
    	row.color = "black";
    else
    	row.color = "#444";
});


// Handle touch events on the "Start Game" button.
function submitGame(){
	Ti.API.info("Pressed button: Invite.");
	$.submit.backgroundColor = "#7C9A5B";
	var checked = "1,2";
	Ti.App.fireEvent('app:createGame', {friends: checked});
};
$.backButton.addEventListener("touchend",function(e){$.win.close();});
$.submit.addEventListener("touchstart",  function(e){$.submit.backgroundColor = "#9CC075";});
$.submit.addEventListener("touchcancel", function(e){$.submit.backgroundColor = "#7C9A5B";});
$.submit.addEventListener("touchend",    function(e){submitGame();});
searchBar.addEventListener("return",     function(e){submitGame();}); 
searchBar.addEventListener("blur",       function(e){searchBar.value="";}); 


// Focus the keyboard in the search bar (now that it's available).
searchBar.focus();
