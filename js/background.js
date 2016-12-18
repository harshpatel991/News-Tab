// var FEED_URL = 'http://cors.io/?u=http://news.google.com/?output=rss';
var FEED_URL = 'https://news.google.com/?output=rss';

var settings =  {FEED_URL: FEED_URL, FEED_ITEMS_COUNT: 10, THEME: 'ocean', SHOW_IMAGES: true, SHOW_DESCRIPTION: true, SHOW_MOST_VISITED: true, DARK_MODE: false};

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
		}
	);

	$('#saveAndClose').click(saveSettingsItems);

	$('#myModal').on('show.bs.modal', function (e) {
		$('#modalLoadingText').html("");
	});
});

function saveSettingsItems() {
	var feedURL = $('#feedURL').val();
	var feedItemsCount = $('#feedItemsCount').val();
	var theme = $('#theme').val();
	var showImages = $('#showImages').is(':checked');
	var showDescription = $('#showDescription').is(':checked');
	var showMostVisited = $('#showMostVisited').is(':checked');
	var darkMode = $('#darkMode').is(':checked');

	settings = {FEED_URL: feedURL, FEED_ITEMS_COUNT: feedItemsCount, THEME: theme, SHOW_IMAGES: showImages , SHOW_DESCRIPTION: showDescription, SHOW_MOST_VISITED: showMostVisited, DARK_MODE: darkMode};
	setDarkMode();
	clearFeed();
	setTheme();
	loadAndDisplayFeed();
	loadAndDisplayMostVisited();

	setObject(settings,
		function() {
			$('#modalLoadingText').html("Saving...");
			$('#myModal').modal('toggle');
		}
	);
}

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

/**
 * Loads settings into the HTML form
 */
function updateSettingsItems() {
	$('#feedURL').val(settings.FEED_URL);
	$('#theme').val(settings.THEME);
	$('#feedItemsCount').val(settings.FEED_ITEMS_COUNT);
	$('#showImages').prop('checked', settings.SHOW_IMAGES);
	$('#showDescription').prop('checked', settings.SHOW_DESCRIPTION);
	$('#showMostVisited').prop('checked', settings.SHOW_MOST_VISITED);
	$('#darkMode').prop('checked', settings.DARK_MODE);
}

function clearFeed() {
	$('#rss-content').empty();
}

function loadAndDisplayMostVisited() {
	if(settings.SHOW_MOST_VISITED) {
		$('#most-visited-row').show();
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

		$('#rss-content').append(newsItemTemplate);
	}
}
