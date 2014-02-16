var game = arguments[0] || {};
Ti.API.info('here');
//try {
	Ti.API.info("play.js: " + game.adjective.toString());
	//$.play.open();
	var gameView = Ti.UI.createView({
	   	top: 300,		// Initialized far away and animated into place to 15
	   	opacity: 0,		// Initialized transparent and animated to fully opaque state
		left: 10,
		right: 10,
	   	height: 110,
		backgroundColor: "transparent",
	});
	var gameViewJudge = Ti.UI.createLabel({
		text: game.judge.name + " is the Judge",
		top: 15,
		left: 20,
		right: 20,
	   	color: "black",
	   	textAlign: "center",
	   	backgroundColor: "white",
	   	font: {
			fontFamily: "Omnes-Regular",
			fontSize: 18
		},
	});
	var gameViewTopic = Ti.UI.createLabel({
		text: game.adjective,
		//text: "BORING",
		top: 45,
		left: 20,
		right: 20,
		textAlign: "left",
		   color: "black",
		   textAlign: "center",
		font: {
			fontFamily: "Proxima Nova-Extra Bold",
			fontSize: 56
		},
	});
	var gameViewPicture = Ti.UI.createImageView({
		image: "http://graph.facebook.com/" + gamedata.judge.id + "/picture?width=200&height=200",
		borderRadius: 100,
		width: 200,
		height: 200
	});
	
	gameView.add(gameViewJudge);
	gameView.add(gameViewTopic);
	gameView.add(gameViewPicture);
	Ti.API.info("Displaying...");
	$.play.add(gameView);
	gameView.animate({
	     top: 80,
	     height: 400,
	     opacity: 1,
	     duration: 350,
	     curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
	});

	//Ti.App.fireEvent('app:requestGameInfo', {game: game.game});
//} catch (e) {alert(e);}



// Handle touch events etc.
function addPhoto(){
	Ti.API.info("Pressed button: Add Photo");
	Alloy.createController('submit');
};
$.backButton.addEventListener("touchend",function(e){$.play.close();});
$.submit.addEventListener("touchstart",  function(e){$.submit.backgroundColor = "#9CC075";});
$.submit.addEventListener("touchcancel", function(e){$.submit.backgroundColor = "#7C9A5B";});
$.submit.addEventListener("touchend",    function(e){addPhoto();});

