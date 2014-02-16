Ti.App.addEventListener('app:play', function(game) {
	
	Ti.API.info("Event Fired: app:play.");
	$.play.open();
	var gameView = Ti.UI.createView({
	   	top: 300,		// Initialized far away and animated into place to 15
	   	opacity: 0,		// Initialized transparent and animated to fully opaque state
		left: 10,
		right: 10,
	   	height: 110,
		backgroundColor: "transparent",
	});
	var gameViewJudge = Ti.UI.createLabel({
		text: game.judge + " started a game about",
		//text: "Derek started a game about",
		top: 15,
		left: 20,
		right: 20,
	   	color: "black",
	   	textAlign: "center",
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
			fontFamily: "ProximaNova-ExtraBold",
			fontSize: 56
		},
	});
	gameView.add(gameViewJudge);
	gameView.add(gameViewTopic);
	Ti.API.info("Displaying...");
	$.play.add(gameView);
	gameView.animate({
	     	top: 80,
	     	opacity: 1,
	     	duration: 350,
	     	curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
	});
	
});


// Handle touch events etc.
function addPhoto(){
	Ti.API.info("Pressed button: Add Photo");
	Alloy.createController('submit').getView().open();
};
$.backButton.addEventListener("touchend",function(e){$.play.close();});
$.submit.addEventListener("touchstart",  function(e){$.submit.backgroundColor = "#9CC075";});
$.submit.addEventListener("touchcancel", function(e){$.submit.backgroundColor = "#7C9A5B";});
$.submit.addEventListener("touchend",    function(e){addPhoto();});

