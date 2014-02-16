// (?): https://developer.appcelerator.com/question/27291/button-inside-a-view---inside-a-tableviewrow
// (?): http://developer.appcelerator.com/question/124202/how-to-add-a-text-and-a-checkbox-on-a-tableviewrow
// My Data-array for Table-view
var checkboxArray = [];
var checked = {};


// Disregard privacy standards; aquire friends.
Ti.App.fireEvent('app:requestFriendList');
Ti.App.addEventListener('app:friendListAcquired', function (message) {
	friends = message.friends;
	Ti.API.warn("FRIENDS LIST 1"+friends[0].id);
	for (var i = 0; i < friends.length; i++) {
		checkboxArray.push({ hasCheck: false, title: friends[i].name, leftImage: 'http://graph.facebook.com/'+friends[i].id+'/picture?type=small', accessibilityValue: friends[i].id });
	}
	
	// Make a UI searchbar that filters the contents of a UI tableview.
	var searchBar = Ti.UI.createSearchBar({
	    showCancel: false,				// button on far right
	    hintText: 'Invite friends...',  // placeholder text
	    //prompt: "to: ",				// centered text above field
	    top: 60,						// absolute position
	    //bottom: 50,
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
	
	//var lastRowClicked;
	tableView.addEventListener('click', function(e){
	    var row = e.row;
	    row.hasCheck = !row.hasCheck;
	    checked[row.accessibilityValue] = row.hasCheck;
	    if(row.hasCheck)
	    	row.color = "black";
	    else
	    	row.color = "#444";
	});
	
	
	// Handle touch events on the "Start Game" button.
	function submitGame(){
		Ti.API.info("Pressed button: Invite.");
		$.submit.backgroundColor = "#7C9A5B";
		var checked_list = [];
		
		for (var key in checked) {
			if (checked[key]) {
				checked_list.push(key);
				Ti.API.info("Next key is "+key);
			}
		}
		Ti.App.fireEvent('app:createGame', {friends: checked_list});
		$.win.close();
	};
	$.submit.addEventListener("touchstart",  function(e){$.submit.backgroundColor = "#9CC075";});
	$.submit.addEventListener("touchcancel", function(e){$.submit.backgroundColor = "#7C9A5B";});
	$.submit.addEventListener("touchend",    function(e){submitGame();});
	searchBar.addEventListener("return",     function(e){submitGame();}); 
	searchBar.addEventListener("blur",       function(e){searchBar.value="";}); 
	
	
	// Now that it's set up, focus on the search bar.
	// I don't think that it should auto focus for the demo because we don't have that many friends.
	searchBar.focus();
});
