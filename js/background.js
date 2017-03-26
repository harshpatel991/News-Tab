var IMAGE_DIRECTORY = '../images/themes/';
var THEME_IMAGES = {aurora: 'aurora.jpg', canyon: 'canyon.jpg', ocean: 'ocean.jpg', brick: 'brick.jpg', farm: 'farm.jpg', mountain: 'mountain.jpg', beach: 'beach.jpg', beach2: 'beach2.jpg', beach3: 'beach3.jpg', islands: 'islands.jpg', seaside: 'seaside.jpg', waterfall: 'waterfall.jpg'};

var HOURS_24 = 86400000;
var MINUTES_30 = 1800000;
var PARSED_FEED_CACHE_KEY = "parsedFeed";

$(document).ready(function() {
	deleteLargeObject("feedCache"); //clear out old feedCache, so there is room for new cache
	deleteLargeObject("feed"); // clear out old unparsed feed, so there is room for new parsed cache
	getObject(settings,
		function(data) {
			settings = data;
			setDarkMode();
			setTheme();
			loadAndDisplayFeed();
			loadAndDisplayMostVisited();
			loadAndDisplayWeather();
			updateSettingsItems();
		}
	);

	$('#saveAndClose').click(saveSettingsItems);

	$('#myModal').on('show.bs.modal', function (e) {
		$('#modalLoadingText').html("");
	});
});

function setDarkMode() {
	if(settings.DARK_MODE) {
		$('body').addClass('dark-mode');
	} else {
		$('body').removeClass('dark-mode');
	}
}

function setTheme() {
	var image = new Image();
	image.onload = function () {
		$('#header').css( { 'background-image': 'url(' + this.src + ')', opacity: 1  });
	};
	image.src = IMAGE_DIRECTORY + THEME_IMAGES[settings.THEME];
}

function clearFeed() {
	$('#rss-content').empty();
}

function loadAndDisplayMostVisited() {
	if(settings.SHOW_MOST_VISITED) {
		$('#most-visited-row').fadeIn(250);
		chrome.topSites.get(function (data) {
			$('.most-visited-site').each(
				function (index) {
					if(data[index] != null) {
						$(this).html('<a href="' + data[index].url + '">' +
							 '<img width="15px" height="15px" src="chrome://favicon/' + data[index].url + '"> ' + data[index].title +
							'</a>');
					}
				}
			);
		});
	} else {
		$('#most-visited-row').hide();
	}
}

function loadAndDisplayFeed () {
	getFromTimedCache(PARSED_FEED_CACHE_KEY, MINUTES_30, displayParsedFeed, loadFeedFromOrigin);
}

function loadFeedFromOrigin () {
	jQuery.getFeed({
		url: getFeedURL(settings.GOOGLE_TOPIC, settings.GOOGLE_REGION),
		success: function(feed) {
			if (feed.items.length == 0) {
				retryLoadFeedOrFail();
			} else {
				var parsedFeed = parseFeed(feed);
				addToTimedCache(PARSED_FEED_CACHE_KEY, parsedFeed);
				displayParsedFeed(parsedFeed); //TODO: could optimize this by only caching the elements that are going to be displayed
			}
		},
		error: function() {
			retryLoadFeedOrFail();
		}
	});
}

function retryLoadFeedOrFail() {
	getFromTimedCache(PARSED_FEED_CACHE_KEY, HOURS_24, displayParsedFeed, function() {}); //try again with a larger expiration time, if that fails, stop
}

function displayParsedFeed(parsedFeed) {
	$('#rss-content').append(parsedFeed).fadeIn(250);
}

function parseFeed(feed) {
	var parsedFeed = '';
	parsedFeed += '<h3 id="rss-title">' + feed.title + '</h3><hr>';
	for (var i = 0; (i<feed.items.length) && (i<settings.FEED_ITEMS_COUNT); i++) {

		var entry = feed.items[i];

		entry.description = entry.description.replace(new RegExp('<img src="//', 'g'), '<img src="http://');

		var dirtyDescription = $.parseHTML(entry.description);

		var image = '';
		if(settings.SHOW_IMAGES) {
			image = '<img class="media-object" width="64px" height="64px" style="width: 64px; height: 64px;" src="' + $(dirtyDescription).find('img').first().attr('src') + '" alt="Image">';
		}

		var title = entry.title;
		var link = entry.link;

		var description = '';
		if(settings.SHOW_DESCRIPTION) {
			description = findDescription(dirtyDescription);
		}

		var newsItemTemplate = '<div class="media news-item"> <div class="media-left"> <a href="ITEM-LINK"> ITEM-IMAGE </a> </div> <div class="media-body"> <h5 class="media-heading"><a href="ITEM-LINK">ITEM-TITLE</a></h5><div class="item-description"> ITEM-DESCRIPTION </div></div> </div><hr>';
		newsItemTemplate = newsItemTemplate.replace("ITEM-IMAGE", image);
		newsItemTemplate = newsItemTemplate.replace("ITEM-TITLE", title);
		newsItemTemplate = newsItemTemplate.replace("ITEM-LINK", link);
		newsItemTemplate = newsItemTemplate.replace("ITEM-LINK", link);
		newsItemTemplate = newsItemTemplate.replace("ITEM-DESCRIPTION", description);

		parsedFeed += newsItemTemplate;
	}
	return parsedFeed;
}

function findDescription(nodesArray) {
	var description = '';
	for (var i = 0; (i<nodesArray.length); i++) {
		var thisChildDescription = recursiveFindDescription(nodesArray[i]);

		if (thisChildDescription.length > description.length) {
			description = thisChildDescription;
		}
	}
	return description.substring(0,250) + "...";
}

function recursiveFindDescription(currentNode) {
	var description = '';

	for(var i = 0, count = currentNode.childNodes.length; i < count; i++) {
		var thisChildDescription = recursiveFindDescription(currentNode.childNodes[i]);

		if (thisChildDescription.length > description.length) {
			description = thisChildDescription;
		}
	}

	if (currentNode.length > description.length) {
		description = currentNode.data;
	}

	return description;
}