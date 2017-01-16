$(document).ready(function () {
	var testFunction = function (data) {
		console.log(data);
	};

	// Retrieve user information based on IP approximation
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
		testFunction(location);
	});
});