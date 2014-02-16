Titanium.Media.showCamera({
	success:function(event) { 
	    Ti.API.info("WE TOOK A PICTURE");            
		var media = event.media;
		try{
		  var xhr = Titanium.Network.createHTTPClient();
		}catch(e){alert(e);}  
		xhr.onerror = function(e){
			Ti.API.info('IN ERROR ' + e.error);
			Ti.UI.createAlertDialog({message: 'Sorry, we could not upload your photo! Please try again.', title: 'Oops', ok: 'OK'});
		};

		xhr.onload = function(){
		 	Ti.API.info('IN ONLOAD ' + this.status + ' readyState ' + this.readyState + this.responseText);      
		 	Ti.App.fireEvent('app:photoTaken', {photo_url: this.responseText,game_id:Alloy.Globals.game_id});
		};
					         
		xhr.onsendstream = function(e){
		    //Ti.API.info('ONSENDSTREAM - PROGRESS: ' + e.progress);
		};
					                     
		// open the client
		try{
		  xhr.open('POST', 'http://d.trumpyourfriends.com/upload.php'); //the server location comes from the 'strings.xml' file 
        }catch(e){alert(e);}
	
		// send the data
		xhr.send({
		    media: media,
		});

	},
    
    cancel: function()
	{   },
	
	error:function(err)
	{
		Ti.API.error(err);
	},

    mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]

});
