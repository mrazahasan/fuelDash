// Census App

// DEV URL : someurl
// PRD URL : someurl

var APP_PREFIX = 'FuelDash-',
	APP_URL = location.origin + '/#/',
	APP_TIMEOUT = 1000 * 30,
	APP_FORMAT = 'json',
	KEY_GOOGLE_MAPS = 'AIzaSyBxh0o8AN01_SQQoLrT55-DmdQZYn_1ZP4';


var API = {


	goToUrl: function (URL) {

		location.reload(APP_URL + URL);
	},
	reload: function () {

		location.reload();

	},

	isConnected: function () {

		return navigator.connection && navigator.connection.type == Connection.NONE;

	},

	capitalizeFirstLetter: function (string) {

		return string.charAt(0).toUpperCase() + string.slice(1);

	},

	location: function (callback, callbackFailure) {
		try {
			navigator.geolocation.getCurrentPosition(function (position) {
				if (position && typeof callback === 'function') {
					console.log('location', position.coords.latitude, position.coords.longitude);

					callback({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					});
				}
			}, function (error) {
				console.error('location', error.code, error.message);

				if (typeof callbackFailure === 'function') {
					callbackFailure(error);
				}
			});
		} catch (ex) {
			console.error('location', ex.name, ex.message);

			//API.dialog.show(Helpers.i18n('error_occurred'), Helpers.i18n('error'));
		}
	},

	getDistance: function (lat1, lng1, lat2, lng2, callback) {

		var location1 = new google.maps.LatLng(lat1, lng1);
		var location2 = new google.maps.LatLng(lat2, lng2);

		var request = {
			origin: location1,
			destination: location2,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		};

		this.distance;
		self = this;

		directionsService = new google.maps.DirectionsService();

		directionsService.route(request, function (response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				//directionsDisplay.setDirections(response);
				callback({
					distance: (response.routes[0].legs[0].distance.text)
				});
				//document.getElementById("distance_road").innerHTML = distance;
			}
		});


	},

	storage: {
		isLoggedIn: function () {

			return API.storage.get('isLoggedIn');

		},
		get: function (key, skipParse) {
			var data = localStorage.getItem(APP_PREFIX + key);

			if (data) {
				if (!skipParse) {
					data = JSON.parse(data);
				}

				return data;
			}
		},
		set: function (key, value, skipParse) {
			if (!skipParse) {
				value = JSON.stringify(value);
			}

			localStorage.setItem(APP_PREFIX + key, value);
		},
		remove: function (key) {
			localStorage.removeItem(APP_PREFIX + key);
		}
	}
}