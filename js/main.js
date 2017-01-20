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

	// Get current weather icon
	var currentIconPath = currentWeatherData.weather[0].icon;
	// Get current weather condition
	var currentConditionsId = currentWeatherData.weather[0].id;
	// console.log("Current conditions ID is: " + currentConditionsId);
	var currentConditionsDescription = currentWeatherData.weather[0].description;
	// console.log("Current conditions is : " + currentConditionsDescription);
	console.log(currentConditionsId);

	$('html').css("background-image", "url("+imagePathFinder(currentIconPath, "backgroundPath")+")");

	currentIconPath = iconConversion(currentIconPath);

	// Update HTML to display current weather conditions
	$('.city-country').html(currentCity + ", " + currentCountry);

	// Update html to display weather icon
	$('.weather-icon').attr("width", "64px");
	$('.weather-icon').attr("height", "64px");
	$('.weather-icon').attr("src", currentIconPath);

	// Update html to display weather description
	$('.weather-desc').html(currentConditionsDescription.replace(/\b\w/g, l => l.toUpperCase()));

	// Update Html to display other information
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
	$('.time').html(currentTime);
}

var iconConversion = function (icon) {
	var iconObj = {
		"01d": "sunny.png",
		"01n": "moon-8.png",
		"02d": "clouds-1.png",
		"02n": "cloudy-night.png",
		"03d": "clouds.png",
		"03n": "clouds.png",
		"04d": "clouds.png",
		"04n": "clouds.png",
		"09d": "raining.png",
		"09n": "raining.png",
		"10d": "morning-rain.png",
		"10n": "night-rain.png",
		"11d": "storm.png",
		"11n": "storm-1.png",
		"13d": "snowing-1.png",
		"13n": "snow.png",
		"50d": "mist.png",
		"50n": "mist.png",
	}
	var filePath = "images/icons/";
	return filePath + iconObj[icon];
}

var imagePathFinder = function (icon, queryTerm) {
 	var filePath = "images/";
 	var weatherInformation = {
 		"01d": {
 			"description": "clear sky",
 			"iconPath": "sunny.png",
 			"backgroundPath": "clear-sky-day.jpg"
 		},
 		"01n": {
 			"description": "clear sky",
 			"iconPath": "moon-8.png",
 			"backgroundPath": "clear-sky-night.jpg"
 		},
 		"02d": {
 			"description": "few clouds",
 			"iconPath": "clouds-1.png",
 			"backgroundPath": "few-clouds-day.jpg"
 		},
 		"02n": {
 			"description": "few clouds",
 			"iconPath": "cloudy-night.png",
 			"backgroundPath": "few-clouds-night.jpg"
 		},
 		"03d": {
 			"description": "scattered clouds",
 			"iconPath": "clouds.png",
 			"backgroundPath": "scatter-cloud-day.jpg"
 		},
 		"03n": {
 			"description": "scattered clouds",
 			"iconPath": "clouds.png",
 			"backgroundPath": "scatter-cloud-night.jpg"
 		},
 		"04d": {
 			"description": "broken clouds",
 			"iconPath": "clouds.png",
 			"backgroundPath": "broken-cloud-day.jpg"
 		},
 		"04n": {
 			"description": "broken clouds",
 			"iconPath": "clouds.png",
 			"backgroundPath": "broken-cloud-night.jpg"
 		},
 		"09d": {
 			"description": "shower rain",
 			"iconPath": "sunny-cloud.jpg",
 			"backgroundPath": "shower-rain-day.jpg"
 		},
 		"09n": {
 			"description": "shower rain",
 			"iconPath": "moon-8.png",
 			"backgroundPath": "shower-rain-night.jpg"
 		},
 		"10d": {
 			"description": "rain",
 			"iconPath": "sunny.png",
 			"backgroundPath": "rain-day.jpg"
 		},
 		"10n": {
 			"description": "rain",
 			"iconPath": "moon-8.png",
 			"backgroundPath": "rain-night.jpg"
 		},
 		"11d": {
 			"description": "thunderstorm",
 			"iconPath": "sunny.png",
 			"backgroundPath": "thunderstorm-day"
 		},
 		"11n": {
 			"description": "thunderstorm",
 			"iconPath": "moon-8.png",
 			"backgroundPath": "thunderstorm-night.jpg"
 		},
 		"13d": {
 			"description": "snow",
 			"iconPath": "sunny.png",
 			"backgroundPath": "snow-day.jpg"
 		},
 		"13n": {
 			"description": "snow",
 			"iconPath": "moon-8.png",
 			"backgroundPath": "snow-night.jpg"
 		},
 		"50d": {
 			"description": "mist",
 			"iconPath": "sunny.png",
 			"backgroundPath": "mist-day.jpg"
 		},
 		"50n": {
 			"description": "mist",
 			"iconPath": "moon-8.png",
 			"backgroundPath": "mist-night.jpg"
 		},
 	}
 	return filePath + weatherInformation[icon][queryTerm];
}