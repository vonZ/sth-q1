app.controller('findUsPageController', ['$scope','$http', '$document',  function($scope, $http, $document){
	console.log("Inne i findUsPageController");
	$scope.showMarker = false; 
	$scope.destination = "St:Eriksgatan 23 112 39 Stockholm";

	$scope.map = {
	    control: {},
	    center: {
	        latitude: 59.3313821,
	        longitude: 18.0282956
	    },
	    zoom: 14
	};

	// marker object
	$scope.marker = {
	    center: {
	        latitude: 59.3313821,
	        longitude: 18.0282956
	    }
	};
	  // instantiate google map objects for directions
	  var directionsDisplay = new google.maps.DirectionsRenderer ({
		draggable: true
	  });
	  var directionsService = new google.maps.DirectionsService();
	  var geocoder = new google.maps.Geocoder();


	  // directions object -- with defaults
	  $scope.directions = {
	    origin: "",
	    destination: $scope.destination,
	    showList: true
	  };

	  // get directions using google maps api
	  $scope.getDirections = function () {

	  	navigator.geolocation.getCurrentPosition(function(position){
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      		$scope.$apply(function(){
		        $scope.long = position.coords.longitude.toString();
		        $scope.lat = position.coords.latitude.toString();
		        console.log("$scope.long: ", $scope.long);
		        console.log("$scope.lat: ", $scope.lat);
		        var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng($scope.lat, $scope.long);
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                        	// console.log("results[1].formatted_address: ",  results[1].formatted_address);
                        	$scope.fromAdress = results[1].formatted_address.toString(); 
                        } else {
                            console.log('Location not found');
                        }
                    } else {
                        console.log('Geocoder failed due to: ' + status);
                    }
                });
	      	});
	    });
	    var request = {
	      origin: $scope.directions.origin,
	      destination: $scope.directions.destination,
	      travelMode: google.maps.DirectionsTravelMode.TRANSIT
	    };
	    directionsService.route(request, function (response, status) {
	      // if (status === google.maps.DirectionsStatus.OK) {
	      //   $scope.showMarker = false;
	      //   directionsDisplay.setDirections(response);
	      //   directionsDisplay.setMap($scope.map.control.getGMap());
	      //   directionsDisplay.setPanel(document.getElementById('directionsList'));
	      // } else {
	        $scope.showMarker = true;
	      // }
	    });
	  };

	  

}]);