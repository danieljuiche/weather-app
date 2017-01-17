$(document).ready(function () {
	approximateLocation();

});

var processData = function (data) {
	// Send user location to OpenWeatherMap
		// Store API Key
		var apiKey = "9f7c06d0eb23c68b0fc17fec2280429b";
		// Store Latitude Location
		var latLocation = data.latitude;
		// Store Longitude Location
		var longLocation = data.longitude;
		// Store Unit
		var unitDefault = "metric"


		// Retrieve information for current weather conditions
		$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latLocation + "&lon=" + longLocation + "&appid=" + apiKey + "&units=" + unitDefault).done (function (currentWeather) {
			console.log(currentWeather);
			
			// Get location information
			var currentCity = currentWeather.name;

			// Get Temperature Information
			var currentTemp = Math.round(currentWeather.main.temp);
			console.log("The current temperature is " + currentTemp);
			var currentHumidity = currentWeather.main.humidity;
			console.log("The current humidty is " + currentHumidity);
			var currentCloudiness = currentWeather.clouds.all;
			console.log("The current cloudiness is " + currentCloudiness);

			// Get current weather condition
			var currentConditionsId = currentWeather.weather[0].id;
			console.log("Current conditions ID is: " + currentConditionsId);
			var currentConditionsDescription = currentWeather.weather[0].description;
			console.log("Current conditions is : " + currentConditionsDescription);
			// Display current weather condition
				// Display humidity
				// Display temperature
					// Perform C to F conversion
		});
			
	console.log(data);
};

var approximateLocation = function () {
	// Retrieve user information based on IP approximation. Courtesty of GeoIP Database
	$.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?') 
	.done (function(location)
	{
		$('#country').html(location.country_name);
		$('#state').html(location.state);
		$('#city').html(location.city);
		$('#postal').html(location.postal);
		$('#latitude').html(location.latitude);
		$('#longitude').html(location.longitude);
		$('#ip').html(location.IPv4);

		// Call additional function
		processData(location);
	});
};