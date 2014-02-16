Ti.App.addEventListener('app:play', function(game) {
	try {
	Ti.API.info("Event Fired: app:play."+game.game);
	Ti.API.info("woo");
	Ti.App.addEventListener('app:gameInfoAcquired', function(gamedata) {
		Ti.API.info("hiii");
		var game = gamedata;
		$.play.open();
		var gameView = Ti.UI.createView({
		   	top: 300,		// Initialized far away and animated into place to 15
		   	opacity: 0,		// Initialized transparent and animated to fully opaque state
			left: 10,
			right: 10,
		   	height: 110,
			backgroundColor: "transparent",
			game_id:game.game
		});
		var gameViewJudge = Ti.UI.createLabel({
			text: game.judge.name + " started a game about",
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
				fontFamily: "Proxima Nova-Extra Bold",
				fontSize: 56
			},
		});
		var gameViewPicture = Ti.UI.createImageView({
			image: "http://graph.facebook.com/"+gamedata.judge.id+"/picture?width=200&height=200",
			borderRadius: 100,
			width: 200,
			height: 200
		});
		
		if (gamedata.has_submitted) {
			alert('you already submitted');
			$.play.remove($.bottom);
			var label1;
			if (gamedata.remaining > 0) {
				label1 = Ti.UI.createLabel({title: 'Waiting for friends'});
			}
			else {
				label1 = Ti.UI.createLabel({title: 'Waiting for '+gamedata.judge.name});
			}
			$.play.add(label1);
		}
		
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
	});
	Ti.App.fireEvent('app:requestGameInfo', {game: game.game});
	} catch (e) {alert(e);}
    
});


function addPhoto(){
    Alloy.Globals.game_id = game.game;
    Alloy.createController('submit',{});
};
// Handle touch events etc.
$.backButton.addEventListener("touchend",function(e){$.play.close();});
$.submit.addEventListener("touchstart",  function(e){$.submit.backgroundColor = "#9CC075";});
$.submit.addEventListener("touchcancel", function(e){$.submit.backgroundColor = "#7C9A5B";});
$.submit.addEventListener("touchend",    function(e){addPhoto();});
