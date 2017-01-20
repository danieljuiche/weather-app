$(document).ready(function () {
	if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		mobileDeviceHandler();
	}
	else {
		approximateLocation();
	}
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
	.done (function(location) {
		// Retrieve local weather conditions based on user location
		processData(location);
	});
};

var updateWeatherConditions = function (currentWeatherData) {
	// Get location information
	var currentCity = currentWeatherData.name;
	var currentCountry = currentWeatherData.sys.country;

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

	// Update time
	updateTime();

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

var updateTime = function () {
	var d = new Date();
	$('.date').html(dayOfWeekConverter(d.getDay()) + ", " + monthConverter(d.getMonth()) + " " + d.getDate() + " " + d.getFullYear());
	$('.time').html(timeConvertor(d.getHours()) + ":" + timeConvertor(d.getMinutes()) + ":" + timeConvertor(d.getSeconds()));
}

var timeConvertor = function (integer) {
	if (integer < 10) {
		return "0" + integer;
	}
	else {
		return integer;
	}
}

var dayOfWeekConverter = function (integer) {
	var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return daysOfWeek[integer];
}

var monthConverter = function (integer) {
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return months[integer];
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

var mobileDeviceHandler = function () {
	$('.display-box').append('<h2 class="mobile-alert">Sorry, this application is not mobile optimized. Please revisit on a computer!</h2>');
	$('h1').css("font-size", "2em");
	$('h2').css("font-size", "1.5em");
	$('h2, h4').css("margin-top","0px");
	$('h2, h4').css("margin-bottom","0px");
	$('.weather-status-container').css("padding", "0px");
	$('.mobile-alert').css("margin", "10px 0px");
	$('.display-box').append('<a href="http://danieljuiche.com">Click here for other projects!</a>');
	$('.attribution-container').hide();
}