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

// (?): https://developer.appcelerator.com/question/27291/button-inside-a-view---inside-a-tableviewrow
// (?): http://developer.appcelerator.com/question/124202/how-to-add-a-text-and-a-checkbox-on-a-tableviewrow
// My Data-array for Table-view
var checkboxArray = [  
  { hasCheck: false, title: "Derek Schultz", leftImage: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/t1/c40.0.160.160/p160x160/1394375_10202509459080754_1157139205_n.jpg" },
  { hasCheck: false, title: "Dan Bulger",    leftImage: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/t1/c40.0.160.160/p160x160/1394375_10202509459080754_1157139205_n.jpg" },
];

// Make a UI searchbar that filters the contents of a UI tableview.
var searchBar = Ti.UI.createSearchBar({
    showCancel: false,				// button on far right
    hintText: 'Invite friends...',  // placeholder text
    //prompt: "to: ",				// centered text above field
    top: 60,						// absolute position
    //bottom: 50,
    minHeight: 35,
    barColor: 'white',
    color: '#444',
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
    //searchHidden: true,		  // Set to true to hide the search field.
    //separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
    //separatorColor: "#fff"
});
$.main.add(tableView);

// (?): http://stackoverflow.com/questions/16062363/titanium-alloy-accessing-ui-from-different-controllers
/*
for(var i = 0; i < 25; i++) {
	var row = Ti.UI.createTableViewRow({
	  // Do not specify 'title' if using Views as children of the Row.
  	  title: i
	});
	tableView.appendRow(row);	
}*/


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
});


// Handle touch events on the "Start Game" button.
function submitGame(){
	Ti.API.info("Pressed button: Invite.");
	$.submit.backgroundColor = "#7C9A5B";
	Ti.App.fireEvent('app:createGame', {friends: searchBar.value.split(',')});
};
$.submit.addEventListener("touchstart",  function(e){$.submit.backgroundColor = "#9CC075";});
$.submit.addEventListener("touchcancel", function(e){$.submit.backgroundColor = "#7C9A5B";});
$.submit.addEventListener("touchend",    function(e){submitGame();});
searchBar.addEventListener("return",     function(e){submitGame();}); 


// Now that it's set up, focus on the search bar.
searchBar.focus();
