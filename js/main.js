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
			// console.log(currentWeatherData);
			updateWeatherConditions(currentWeatherData);
		});
};

var approximateLocation = function () {
	// Retrieve user information based on IP approximation. Courtesty of GeoIP Database
	$.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?') 
	.done (function(location) {
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
	var currentHumidity = currentWeatherData.main.humidity;
	var currentCloudiness = currentWeatherData.clouds.all;

	// Get current weather icon
	var currentIconPath = currentWeatherData.weather[0].icon;
	updateWeatherStatus(currentWeatherData.weather);

	// Get current weather condition
	var currentConditionsId = currentWeatherData.weather[0].id;
	var currentConditionsDescription = currentWeatherData.weather[0].description;

	$('html').css("background-image", "url("+imagePathFinder(currentIconPath, "backgroundPath")+")");

	// Update HTML to display current weather conditions
	$('.city-country').html(currentCity + ", " + currentCountry);

	// Update html to display weather icon
	$('.weather-icon').attr("width", "64px");
	$('.weather-icon').attr("height", "64px");

	// Update html to display weather description
	// $('.weather-desc').html(currentConditionsDescription.replace(/\b\w/g, l => l.toUpperCase()));

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

// Image path finder helper function
var imagePathFinder = function (icon, queryTerm) {
 	var filePath = "images/";
 	var weatherInformation = {
 		"01d": {
 			"description": "clear sky",
 			"iconPath": "icons/sunny.png",
 			"backgroundPath": "clear-sky-day.jpg"
 		},
 		"01n": {
 			"description": "clear sky",
 			"iconPath": "icons/moon-8.png",
 			"backgroundPath": "clear-sky-night.jpg"
 		},
 		"02d": {
 			"description": "few clouds",
 			"iconPath": "icons/clouds-1.png",
 			"backgroundPath": "few-clouds-day.jpg"
 		},
 		"02n": {
 			"description": "few clouds",
 			"iconPath": "icons/cloudy-night.png",
 			"backgroundPath": "few-clouds-night.jpg"
 		},
 		"03d": {
 			"description": "scattered clouds",
 			"iconPath": "icons/clouds.png",
 			"backgroundPath": "scatter-cloud-day.jpg"
 		},
 		"03n": {
 			"description": "scattered clouds",
 			"iconPath": "icons/clouds.png",
 			"backgroundPath": "scatter-cloud-night.jpg"
 		},
 		"04d": {
 			"description": "broken clouds",
 			"iconPath": "icons/clouds.png",
 			"backgroundPath": "broken-cloud-day.jpg"
 		},
 		"04n": {
 			"description": "broken clouds",
 			"iconPath": "icons/clouds.png",
 			"backgroundPath": "broken-cloud-night.jpg"
 		},
 		"09d": {
 			"description": "shower rain",
 			"iconPath": "icons/raining.png",
 			"backgroundPath": "shower-rain-day.jpg"
 		},
 		"09n": {
 			"description": "shower rain",
 			"iconPath": "icons/raining.png",
 			"backgroundPath": "shower-rain-night.jpg"
 		},
 		"10d": {
 			"description": "rain",
 			"iconPath": "icons/morning-rain.png",
 			"backgroundPath": "rain-day.jpg"
 		},
 		"10n": {
 			"description": "rain",
 			"iconPath": "icons/night-rain.png",
 			"backgroundPath": "rain-night.jpg"
 		},
 		"11d": {
 			"description": "thunderstorm",
 			"iconPath": "icons/storm.png",
 			"backgroundPath": "thunderstorm-day"
 		},
 		"11n": {
 			"description": "thunderstorm",
 			"iconPath": "icons/storm-1.png",
 			"backgroundPath": "thunderstorm-night.jpg"
 		},
 		"13d": {
 			"description": "snow",
 			"iconPath": "icons/snowing-1.png",
 			"backgroundPath": "snow-day.jpg"
 		},
 		"13n": {
 			"description": "snow",
 			"iconPath": "icons/snow.png",
 			"backgroundPath": "snow-night.jpg"
 		},
 		"50d": {
 			"description": "mist",
 			"iconPath": "icons/mist.png",
 			"backgroundPath": "mist-day.jpg"
 		},
 		"50n": {
 			"description": "mist",
 			"iconPath": "icons/mist.png",
 			"backgroundPath": "mist-night.jpg"
 		},
 	}
 	if (queryTerm === "iconPath" || queryTerm === "backgroundPath") {
 		return filePath + weatherInformation[icon][queryTerm];
 	} else {
 		return weatherInformation[icon][queryTerm];
 	}
}

var updateWeatherStatus = function (weatherConditionArray) {
	var counter = 1;
	var conditionArray = [];
	weatherConditionArray.forEach( function (condition) {
		if (($.inArray(condition.icon, conditionArray)) === -1) {
			var newContainer = '.container' + counter;
			$('.weather-status-container').append('<div class="container' + counter + '">' );
			$(newContainer).append('<img class="weather-icon" src="' + imagePathFinder(condition.icon, "iconPath") + '">');
			$(newContainer).append('<h2 class="weather-desc">' + imagePathFinder(condition.icon,"description").replace(/\b\w/g, l => l.toUpperCase()) + '</h2>')
			$(newContainer).append('</div');
			$(newContainer).css("margin-bottom", "15px");
			
			conditionArray.push(condition.icon);
			counter++;
		}
	});

	$('.weather-desc').css({
		"font-size": "2em",
		"color": "#616161",
		"margin-top": "10px"
	});
}