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

		updateLocation(latLocation, longLocation);
		// Store Unit
		var unitDefault = "metric"

		// Retrieve information for current weather conditions
		$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latLocation + "&lon=" + longLocation + "&appid=" + apiKey + "&units=" + unitDefault).done (function (currentWeatherData) {
			console.log(currentWeatherData);
			updateWeatherConditions(currentWeatherData);
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

		// Retrieve local weather conditions based on user location
		processData(location);
	});
};

var updateWeatherConditions = function (currentWeatherData) {
	// Get location information
	var currentCity = currentWeatherData.name;
	var currentCountry = currentWeatherData.sys.country;

	// Get time information in UNIX
	var currentTime = timeConversion(currentWeatherData.dt);
	updateTime(currentTime);

	// Get Temperature Information
	var currentTemp = Math.round(currentWeatherData.main.temp);
	// console.log("The current temperature is " + currentTemp);
	var currentHumidity = currentWeatherData.main.humidity;
	// console.log("The current humidty is " + currentHumidity);
	var currentCloudiness = currentWeatherData.clouds.all;
	// console.log("The current cloudiness is " + currentCloudiness);

	// Get current weather condition
	var currentConditionsId = currentWeatherData.weather[0].id;
	// console.log("Current conditions ID is: " + currentConditionsId);
	var currentConditionsDescription = currentWeatherData.weather[0].description;
	// console.log("Current conditions is : " + currentConditionsDescription);

	$('.city-country').html(currentCity + ", " + currentCountry);
	$('.temperature').html("Temperature: " + currentTemp + " &deg;C");
	$('.humidity').html("Humidity: " + currentHumidity + "%");
	$('.cloudiness').html("Cloudiness: " + currentCloudiness + "%");
}

var updateLocation = function (latitude, longitude) {
	$('.latitude').html("Latitude: " + latitude);
	$('.longitude').html("Longitude: " + longitude);
}

var timeConversion = function (unixTime) {
	var date = new Date(unixTime*1000);
	// Hours part from the timestamp
	var hours = date.getHours();
	if (hours <= 9) {
		hours = "0" + hours;
	}
	// Minutes part from the timestamp
	var minutes = "0" + date.getMinutes();
	// Seconds part from the timestamp
	var seconds = "0" + date.getSeconds();

	// Will display time in 10:30:23 format
	var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	return formattedTime;
}

var updateTime = function (currentTime) {
	$('.time').html("Time: " + currentTime);
}