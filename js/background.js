var IMAGE_DIRECTORY = '../images/themes/';
var THEME_IMAGES = {ocean: 'ocean.jpg', brick: 'brick.jpg', farm: 'farm.jpg', mountain: 'mountain.jpg', beach: 'beach.jpg', beach2: 'beach2.jpg', waterfall: 'waterfall.jpg'};

$(document).ready(function() {
	getObject(settings,
		function(data) {
			settings = data;
			setDarkMode();
			loadAndDisplayMostVisited();
			updateSettingsItems();
			setTheme();
			loadAndDisplayFeed();
			loadAndDisplayWeather();
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
	var themeImage = IMAGE_DIRECTORY + THEME_IMAGES[settings.THEME];
	$('#header').css('background-image', 'url(' + themeImage + ')');
}


function clearFeed() {
	$('#rss-content').empty();
}

function loadAndDisplayMostVisited() {
	if(settings.SHOW_MOST_VISITED) {
		$('#most-visited-row').fadeIn(300);
		chrome.topSites.get(function (data) {
			$('.most-visited-site').each(
				function (index) {
					if(data[index] != null) {
						$(this).html('<a href="' + data[index].url + '">' +
							'<img src="chrome://favicon/' + data[index].url + '"> ' + data[index].title +
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
	jQuery.getFeed({
		url: settings.FEED_URL,
		success: function(feed) {
			if (feed.items.length == 0) {
				readFromCache(function(feed) {
					displayFeed(feed);
				} );
			} else {
				saveToCache(feed);
				displayFeed(feed);
			}
		}
	});
}

function displayFeed(feed) {
	$('#rss-content').append('<h3 id="rss-title">' + feed.title + '</h3><hr>');
	for (var i = 0; (i<feed.items.length) && (i<settings.FEED_ITEMS_COUNT); i++) {

		var entry = feed.items[i];

		entry.description = entry.description.replace(new RegExp('<img src="//', 'g'), '<img src="http://');

		var dirtyDescription = $.parseHTML(entry.description);

		var image = '';
		if(settings.SHOW_IMAGES) {
			image = '<img class="media-object" src="' + $(dirtyDescription).find('img').attr('src') + '" alt="Image">';
		}

		var title = entry.title;
		var link = entry.link;

		var description = '';
		if(settings.SHOW_DESCRIPTION) {
			description = dirtyDescription[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[4].innerHTML;
		}

		var newsItemTemplate = '<div class="media news-item"> <div class="media-left"> <a href="ITEM-LINK"> ITEM-IMAGE </a> </div> <div class="media-body"> <h5 class="media-heading"><a href="ITEM-LINK">ITEM-TITLE</a></h5><div class="item-description"> ITEM-DESCRIPTION </div></div> </div><hr>';
		newsItemTemplate = newsItemTemplate.replace("ITEM-IMAGE", image);
		newsItemTemplate = newsItemTemplate.replace("ITEM-TITLE", title);
		newsItemTemplate = newsItemTemplate.replace("ITEM-LINK", link);
		newsItemTemplate = newsItemTemplate.replace("ITEM-LINK", link);
		newsItemTemplate = newsItemTemplate.replace("ITEM-DESCRIPTION", description);

		$('#rss-content').append(newsItemTemplate).fadeIn(300);
	}
}
