// var FEED_URL = 'http://cors.io/?u=http://news.google.com/?output=rss';
var FEED_URL = 'https://news.google.com/?output=rss';
var settings =  { //default settings
	FEED_URL: FEED_URL,
	FEED_ITEMS_COUNT: 10,
	THEME: 'beach3',
	SHOW_IMAGES: true,
	SHOW_DESCRIPTION: true,
	SHOW_MOST_VISITED: true,
	DARK_MODE: false,
	WEATHER_LOCATION: 'Austin, TX',
	WEATHER_UNITS: 'f',
	GOOGLE_REGION: 'UNITED_STATES_ENGLISH',
	GOOGLE_TOPIC: 'TOP_STORIES'
};

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
	var googleTopic = $('#googleTopic').val();
	var googleRegion = $('#googleRegion').val();

	settings = {
		FEED_URL: feedURL,
		FEED_ITEMS_COUNT: feedItemsCount,
		THEME: theme,
		SHOW_IMAGES: showImages ,
		SHOW_DESCRIPTION: showDescription,
		SHOW_MOST_VISITED: showMostVisited,
		DARK_MODE: darkMode,
		WEATHER_LOCATION: weatherLocation,
		WEATHER_UNITS: weatherUnits,
		GOOGLE_TOPIC: googleTopic,
		GOOGLE_REGION: googleRegion
	};

	setDarkMode();
	clearFeed();
	setTheme();
	loadAndDisplayMostVisited();

	//bust the cache
	addToTimedCache(PARSED_FEED_CACHE_KEY, "");
	loadAndDisplayFeed();

	//bust the cache
	addToTimedCache(WEATHER_CACHE_KEY, "");
	loadAndDisplayWeather();

	setObject(settings,
		function() {
			$('#myModal').modal('toggle');
		}
	);
}

/**
 * Loads settings into the HTML form
 */
function updateSettingsItems() {
	//add items to google lists
	for (var aTopic in TOPIC) {
		if (TOPIC.hasOwnProperty(aTopic)) {
			$('#googleTopic').append('<option value="'+ aTopic +'">' + TOPIC[aTopic].name + '</option>');
		}
	}

	for (var aRegion in REGION) {
		if (REGION.hasOwnProperty(aRegion)) {
			$('#googleRegion').append('<option value="'+ aRegion +'">' + REGION[aRegion].name + '</option>');
		}
	}

	$('#feedURL').val(settings.FEED_URL);
	$('#theme').val(settings.THEME);
	$('#feedItemsCount').val(settings.FEED_ITEMS_COUNT);
	$('#showImages').prop('checked', settings.SHOW_IMAGES);
	$('#showDescription').prop('checked', settings.SHOW_DESCRIPTION);
	$('#showMostVisited').prop('checked', settings.SHOW_MOST_VISITED);
	$('#darkMode').prop('checked', settings.DARK_MODE);
	$('#weather-location').val(settings.WEATHER_LOCATION);
	$('#weather-units').val(settings.WEATHER_UNITS);
	$('#googleTopic').val(settings.GOOGLE_TOPIC);
	$('#googleRegion').val(settings.GOOGLE_REGION);
}