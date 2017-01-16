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

		console.log("http://api.openweathermap.org/data/2.5/weather?lat=" + latLocation + "&lon=" + longLocation + "&appid=" + apiKey);

		// Retrieve information for current weather conditions
		$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latLocation + "&lon=" + longLocation + "&appid=" + apiKey).done (function (currentWeather) {
			console.log(currentWeather)
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