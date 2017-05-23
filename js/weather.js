var WEATHER_CACHE_KEY = "weather";
	
function loadAndDisplayWeather() {
	getFromTimedCache(WEATHER_CACHE_KEY, MINUTES_30, displayWeather, getWeatherFromOrigin);
}

function displayWeather(weather) {
	var html = '<h3 style="text-align: right; margin:0"><i class="icon-'+weather.code+'" id="weather-icon"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h3>';

	if (weather.forecast && weather.forecast[1]) { //check if value is defined for backwards compatibility
		html += ' <h5 style="display: inline-block; margin:0"> Tomorrow: ' + weather.forecast[1].text + ' ' + weather.forecast[1].high + '&deg;</h5>';
	}
	$("#weather").html(html).fadeIn(300);
}

function getWeatherFromOrigin() {
	$.simpleWeather({
		location: settings.WEATHER_LOCATION,
		woeid: '',
		unit: settings.WEATHER_UNITS,
		success: function(weather) {
			displayWeather(weather);
			addToTimedCache(WEATHER_CACHE_KEY, {"code": weather.code, "temp": weather.temp, "forecast": weather.forecast, "units": {"temp": weather.units.temp}}); //only cache the data that's going to be used
		},
		error: function(error) {
			retryLoadWeatherOrFail();
		}
	});
}

function retryLoadWeatherOrFail() {
	getFromTimedCache(WEATHER_CACHE_KEY, HOURS_24, displayWeather, function() {}); //try again with a larger expiration time, if that fails, stop
}