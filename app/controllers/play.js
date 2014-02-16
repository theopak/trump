Ti.App.addEventListener('app:play', function(game) {
	
	//TBD
	
});

// Handle touch events etc.
	function addPhoto(){
		Ti.API.info("Pressed button: Add Photo");
	};
	$.backButton.addEventListener("touchend",function(e){$.play.close();});
	$.submit.addEventListener("touchstart",  function(e){$.submit.backgroundColor = "#9CC075";});
	$.submit.addEventListener("touchcancel", function(e){$.submit.backgroundColor = "#7C9A5B";});
	$.submit.addEventListener("touchend",    function(e){addPhoto();});

