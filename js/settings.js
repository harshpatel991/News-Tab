// var FEED_URL = 'http://cors.io/?u=http://news.google.com/?output=rss';
var FEED_URL = 'https://news.google.com/?output=rss';
var settings =  {FEED_URL: FEED_URL, FEED_ITEMS_COUNT: 10, THEME: 'ocean', SHOW_IMAGES: true, SHOW_DESCRIPTION: true, SHOW_MOST_VISITED: true, DARK_MODE: false, WEATHER_LOCATION: 'Austin, TX', WEATHER_UNITS: 'f'};

function saveSettingsItems() {
	var feedURL = $('#feedURL').val();
	var feedItemsCount = $('#feedItemsCount').val();
	var theme = $('#theme').val();
	var showImages = $('#showImages').is(':checked');
	var showDescription = $('#showDescription').is(':checked');
	var showMostVisited = $('#showMostVisited').is(':checked');
	var darkMode = $('#darkMode').is(':checked');
	var weatherLocation = $('#weather-location').val();
	var weatherUnits = $('#weather-units').val();

	settings = {FEED_URL: feedURL, FEED_ITEMS_COUNT: feedItemsCount, THEME: theme, SHOW_IMAGES: showImages , SHOW_DESCRIPTION: showDescription, SHOW_MOST_VISITED: showMostVisited, DARK_MODE: darkMode, WEATHER_LOCATION: weatherLocation, WEATHER_UNITS: weatherUnits};
	setDarkMode();
	clearFeed();
	setTheme();
	loadAndDisplayFeed();
	loadAndDisplayMostVisited();

	//bust the cache
	addToTimedCache("weather", "");
	loadAndDisplayWeather();

	setObject(settings,
		function() {
			$('#modalLoadingText').html("Saving...");
			$('#myModal').modal('toggle');
		}
	);
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
	$('#weather-location').val(settings.WEATHER_LOCATION);
	$('#weather-units').val(settings.WEATHER_UNITS);
}