var WEATHER_CACHE_KEY = "weather";
	
function loadAndDisplayWeather() {
	getFromTimedCache(WEATHER_CACHE_KEY, MINUTES_30, displayWeather, getWeatherFromOrigin);
}

function displayWeather(weather) {
	$("#weather").html('<h3 style="margin:0"><i class="icon-'+weather.code+'" id="weather-icon"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h3>').fadeIn(300);
}

function getWeatherFromOrigin() {
	$.simpleWeather({
		location: settings.WEATHER_LOCATION,
		woeid: '',
		unit: settings.WEATHER_UNITS,
		success: function(weather) {
			displayWeather(weather);
			addToTimedCache(WEATHER_CACHE_KEY, {"code": weather.code, "temp": weather.temp, "units": {"temp": weather.units.temp}}); //only cache the data that's going to be used
		},
		error: function(error) {
			retryLoadWeatherOrFail();
		}
	});
}

function retryLoadWeatherOrFail() {
	getFromTimedCache(WEATHER_CACHE_KEY, HOURS_24, displayWeather, function() {}); //try again with a larger expiration time, if that fails, stop
}