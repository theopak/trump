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


// Make a UI searchbar that filters the contents of a UI tableview.
var searchBar = Ti.UI.createSearchBar({
    showCancel: false,				// button on far right
    hintText: 'Invite friends...',  // placeholder text
    //prompt: "to: ",				// centered text above field
    top: 60,						// absolute
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
    search: searchBar,
    filterAttribute: 'title',     // http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.TableView-property-filterAttribute
    filterCaseInsensitive: true,  // Determines whether the search is case insensitive.
    //searchHidden: true,		  // Set to true to hide the search field.
    //separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
    //separatorColor: "#fff"
});
$.main.add(tableView);

// (?): http://stackoverflow.com/questions/16062363/titanium-alloy-accessing-ui-from-different-controllers
for(var i = 0; i < 25; i++) {
	var row = Ti.UI.createTableViewRow({
	  // Do not specify 'title' if using Views as children of the Row.
  	  title: i
	});
	tableView.appendRow(row);	
}


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
