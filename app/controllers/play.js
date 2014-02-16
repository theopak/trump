Ti.App.addEventListener('app:play', function(game) {
	try {
	Ti.API.info("Event Fired: app:play."+game.game);
	Ti.API.info("woo");
	Ti.App.addEventListener('app:gameInfoAcquired', function(gamedata) {
		Ti.API.info("hiii");
		var game = gamedata;
		$.play.open();
		var gameView = Ti.UI.createView({
		   	top: 80,		// Initialized far away and animated into place to 15
		   	opacity: 0,		// Initialized transparent and animated to fully opaque state
			left: 20,
			right: 20,
			backgroundColor: "transparent",
			game_id:game.game
		});
		var gameViewJudge = Ti.UI.createLabel({
			text: game.judge.name + " started a game about",
			//text: "Derek started a game about",
			top: 0,
		   	color: "#545454",
		   	textAlign: "center",
		   	font: {
				fontFamily: "Omnes-Regular",
				fontSize: 18
			},
		});
		var gameViewTopic = Ti.UI.createLabel({
			text: game.adjective,
			//text: "BORING",
			top: 130,
			left: 20,
			right: 20,
			textAlign: "left",
			color: "#545454",
			textAlign: "center",
			borderRadius: 4,
			backgroundColor: "white",
			opacity: 0.8,
			font: {
				fontFamily: "Proxima Nova-Extra Bold",
				fontSize: 52
			},
		});
		var gameViewPicture = Ti.UI.createImageView({
			image: "http://graph.facebook.com/"+gamedata.judge.id+"/picture?width=200&height=200",
			top: 105,
			borderRadius: 200,
			width: 200,
			height: 200
		});
		
		gameView.add(gameViewJudge);
		gameView.add(gameViewTopic);
		Ti.API.info("Displaying...");
		$.play.add(gameViewPicture);
		$.play.add(gameView);
		gameView.animate({
		     opacity: 1,
		     duration: 350,
		     curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
		});
	});
	Ti.App.fireEvent('app:requestGameInfo', {game: game.game});
	} catch (e) {alert(e);}
    Alloy.Globals.game_id = game.game;

});


function addPhoto(){
    Alloy.createController('submit',{});
};
// Handle touch events etc.
$.backButton.addEventListener("touchend",function(e){$.play.close();});
$.submit.addEventListener("touchstart",  function(e){$.submit.backgroundColor = "#9CC075";});
$.submit.addEventListener("touchcancel", function(e){$.submit.backgroundColor = "#7C9A5B";});
$.submit.addEventListener("touchend",    function(e){addPhoto();});

