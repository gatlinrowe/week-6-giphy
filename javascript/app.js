$(document).ready(function() {
	var buttons = ['laughing','love','hate','funny','cute','gross','sad'];
	var offset = 0;
	function refreshButtons(){
		$("#buttons").empty();
		for (var i = 0; i < buttons.length; i++) {
			var searchItem = $("<button>");
			searchItem.attr("id", "button");
			searchItem.append(buttons[i]);
			console.log(buttons[i]);
			searchItem.appendTo("#buttons");
		}
	}

	$('#addSearch').on('click', function(){
		if ($("#search").val().trim() === "") {
			return false;
		}else {
			buttons.push($('#search').val().trim());
			$("#buttons").empty();
			refreshButtons();
			$("#search").val("");
			return false;
		}
	})	
		$(document.body).on('click', '.giphy', function(){
	    var state = $(this).attr('data-state'); 
	
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
	});
	$(document.body).on('click', '#button', function(){
		offset = offset +10;
		var search = ($(this).text());
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10&offset="+offset;
		console.log(search);
		console.log($(this).text());
		$('#gifs').empty();
		$.ajax({url: queryURL, method: 'GET'})
	 	.done(function(response) {
	 	    console.log(response);
	   	  var results = response.data;	

			  for (var i = 0; i < results.length; i++) {
					var gifDiv = $('<div>');
					gifDiv.attr('id', "gif");
   	            var p = $('<p>').text("Rating: " + results[i].rating);	

	            var gifImage = $('<img>');
   	            gifImage.attr('src', results[i].images.original_still.url)
   	            gifImage.attr('data-still', results[i].images.original_still.url);
   	            gifImage.attr('data-animate', results[i].images.original.url);
   	            gifImage.attr('data-state', 'still');
				gifImage.addClass("giphy");
	                gifDiv.append(p);
   	             gifDiv.append(gifImage);
   	             $('#gifs').prepend(gifDiv);
		     };
		});
	});

	 refreshButtons();

});