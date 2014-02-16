var win = Ti.UI.createWindow({backgroundColor: "black"});
var images = [];

var directions = Ti.UI.createLabel({title: "Swipe left and right. Double tap to choose your favorite.", color: "white", top: 10});

Ti.App.fireEvent('app:requestSubmissions', game);

Ti.App.addEventListener('app:submissionsAcquired', function (submissiondata) {
	submissions = submissiondata;
	
	for (var i = 0; i < submissions.length; i++) {
		var image = Ti.UI.createImageView({ image: submissions[i].url });
		
		if (Alloy.Globals.voting_power)
			image.addEventListener("doubletap", function(evt) { alert('winner chosen.'); /* Ti.App.fireEvent('app:winnerChosen', {winner: submissions[i].id})*/ });
		
		images.push(image);
	}
	
	var scrollableView = Ti.UI.createScrollableView({
	  views: images,
	  showPagingControl: true
	});
	
	win.add(directions);
	win.add(scrollableView);
	win.open();
		
});

