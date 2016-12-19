function loadAndDisplayWeather() {
	getFromTimedCache("weather", 1800000, setWeather, getWeatherFromOrigin);
}

function setWeather(weather) {
	$("#weather").html('<h3 style="margin:0"><i class="icon-'+weather.code+'" id="weather-icon"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h3>');
}

function getWeatherFromOrigin() {
	$.simpleWeather({
		location: settings.WEATHER_LOCATION,
		woeid: '',
		unit: settings.WEATHER_UNITS,
		success: function(weather) {
			setWeather(weather);
			addToTimedCache("weather", weather);
		},
		error: function(error) {
			getFromTimedCache("weather", 30000000, setWeather, function() {}); //try again with a larger expiration time
		}
	});
}