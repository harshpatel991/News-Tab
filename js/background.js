var req;

$(document).ready(function() {
	var _appendElement = '<input type="hidden" name="cx" value="013056768840040662406:xjc9ebnmjlk">'
	$('#searchForm').append(_appendElement);


	var FEED_URL = 'http://news.google.com/?output=rss';
	jQuery.getFeed({
		url: FEED_URL,
		success: function(feed) {

			for (var i = 0; i<feed.items.length; i++) {
				var entry = feed.items[i];
				var div = document.createElement("div");
				div.appendChild(document.createTextNode(entry.title));
				$(div).append(entry.description);
				$('#rss-content').append(div);

			}
		}
	});


});
