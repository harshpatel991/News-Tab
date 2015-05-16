var req;

$(document).ready(function() {
	var _appendElement = '<input type="hidden" name="cx" value="013056768840040662406:xjc9ebnmjlk">'
	$('#searchForm').append(_appendElement);



	var FEED_URL = 'http://news.google.com/?output=rss';
	jQuery.getFeed({
		url: FEED_URL,
		success: function(feed) {
			$('#rss-title').html(feed.title)

			for (var i = 0; i<feed.items.length; i++) {
				var entry = feed.items[i];

				var dirtyDescription = $.parseHTML(entry.description);

				var image = "http://" + dirtyDescription[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].src.slice(19);
				var title = feed.items[i].title;
				var description = dirtyDescription[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[4].innerHTML;

				var newsItemTemplate = '<div class="media news-item"> <div class="media-left"> <a href="#"> <img class="media-object" src="ITEM-IMAGE" alt="Image"> </a> </div> <div class="media-body"> <h5 class="media-heading">ITEM-TITLE</h5><div class="item-description"> ITEM-DESCRIPTION </div></div> </div><hr>';

				newsItemTemplate = newsItemTemplate.replace("ITEM-IMAGE", image);
				newsItemTemplate = newsItemTemplate.replace("ITEM-TITLE", title);
				newsItemTemplate = newsItemTemplate.replace("ITEM-DESCRIPTION", description);

				$('#rss-content').append(newsItemTemplate);

			}
		}
	});


});
