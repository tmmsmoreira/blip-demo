$(function() {
	var search = function search(search) {
		$("#my-content").fadeOut(function() {
			$("#my-loader").fadeIn();
			
			$.ajax({
				url: 'https://api.twitch.tv/kraken/search/streams?q=' + search,
				type: 'GET',
				dataType: 'json',
				headers: {
					'Access-Control-Allow-Orgin':'*',
					'Client-ID': 'q9k2mh6i7wxofogt73wr69eihx41ft7'
				},
				success: function(data) {
					$("#my-loader").fadeOut(function() {
						$("#my-content .row").empty();
						if (data.streams.length > 0) {
							for(var i=0; i < data.streams.length; i++) {
								$("#my-content .row").append("<div class='col-md-3'><a href='channel.html?n="+data.streams[i].channel.name+"'><div class='channel'><img src='"+data.streams[i].channel.logo+"' /></div></a></div>");
							}
						} else {
							$("#my-content .row").append("<div class='col-md-12 text-center'><h3>No results</h3></div>");
						}
						$("#my-content").fadeIn();
						$(".channel img").error(function() {
							$(this).attr("src", "img/default.png");
						});
					});
				},
				error: function(err) {
					console.log(err)
				}
			});
		});
	}
	
	$("#my-form").submit(function(e) {
		e.preventDefault();
		if ($("#search-field").val()) {
			search($("#search-field").val());
		}
	});
	
	search('all');
});
