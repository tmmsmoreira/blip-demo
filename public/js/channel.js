$(function() {
	var openChannel = function openChannel() {
		$("#my-channel").fadeOut(function() {
			$("#my-loader").fadeIn();
			
			var channel = getUrlParameter('n');
			
			getChannelInfo(function(data) {
				$("#display-name").text(data.stream.channel.display_name);
				$("#viewers").text(data.stream.viewers);
				$("iframe").attr("src", "http://player.twitch.tv/?channel=" + channel);
				$("iframe").show();
				$("#my-loader").fadeOut(function() {
					$("#my-channel").fadeIn();
				});
				setInterval(updateViewers, 5000);
			});
		});
	};
	
	var getUrlParameter = function getUrlParameter(sParam) {
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	};
	
	var getChannelInfo = function getChannelInfo(callback) {
		var channel = getUrlParameter('n');
		
		$.ajax({
			url: 'https://api.twitch.tv/kraken/streams/' + channel,
			type: 'GET',
			dataType: 'json',
			headers: {
				'Client-ID': 'q9k2mh6i7wxofogt73wr69eihx41ft7'
			},
			success: function(data) {
				callback(data);
			},
			error: function(err) {
				console.log(err)
			}
		});
	};
	
	var updateViewers = function updateViewers(sParam) {
		getChannelInfo(function(data) {
			$("#viewers").text(data.stream.viewers);
		});
	};
	
	openChannel();
});
