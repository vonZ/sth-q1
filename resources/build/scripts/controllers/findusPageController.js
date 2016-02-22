app.controller('findUsPageController', ['$scope','$http', '$document', 'Map',  '$timeout',  function($scope, $http, $document, Map, $timeout){
	console.log("Inne i findUsPageController");

	var self = this; 

   	$scope.places = [
	    {
	        place : 'Stockholm hår',
	        desc : 'Detta är Stockholm Hår',
	        lat : 59.3313821,
	        long : 18.0282956
	    }
	];

  // 	angular.element(document).ready(function () {
		// $scope.overviewMap($scope.places);
  //   });

   	$scope.overviewMap = function(places) {
   		console.log("overviewMap");
   		self.Map = initOverviewMap();
   		self.Map = overviewMap($scope.places);
   	};

	
   	$scope.geolocation = function() {
   		$scope.loading = true;
   		var directionsService = new google.maps.DirectionsService();
		var directionsDisplay = new google.maps.DirectionsRenderer ({
			draggable: false
		});

		navigator.geolocation.getCurrentPosition(function(position){
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			$scope.long = position.coords.longitude;
	    	$scope.lat = position.coords.latitude;
			$scope.$apply(function(){
		        console.log("$scope.long (i navigator.geolocation): ", $scope.long);
		        console.log("$scope.lat: (i navigator.geolocation)", $scope.lat);
		       	$scope.places.push({
		        	place: 'Din nuvarande position',
		        	desc: '',
		        	lat: $scope.lat,
		        	long: $scope.long
		        });

		        console.log("places: ", $scope.places);
				$scope.loading = false;
		        $scope.overviewMap($scope.places); 
	  		});
		}); 
   	};
	


	// $scope.showMarker = false; 
	// $scope.destination = "St:Eriksgatan 23 112 39 Stockholm";
	// var directionsService = new google.maps.DirectionsService();
	// var directionsDisplay = new google.maps.DirectionsRenderer ({
	// 	draggable: false
	// });

	// $scope.initMap = function(long, lat, fromAdress) {
	// 	console.log("long (i initMap): ", long);
	// 	console.log("lat (i initMap): ", lat);
	// 	console.log("fromAdress (i initMap) HATA --->", fromAdress); 

	// 	$scope.map = {
	// 	    control: {
	// 	    	draggable: true
	// 	    },
	// 	    center: {
	// 	        latitude: 59.3313821,
	// 	        longitude: 18.0282956
	// 	    },
	// 	    zoom: 13
	// 	};
	// 	// marker object
	// 	$scope.marker = {
	// 	    center: {
	// 	        latitude: 59.3313821,
	// 	        longitude: 18.0282956
	// 	    }
	// 	};


	// 	if(fromAdress !== undefined) {

	// 		console.log("fromAdress är inte undefined"); 
	// 		fromAdress = fromAdress.toString(); 	
	// 		console.log("typeof fromAdress", typeof fromAdress); 
	// 	}

	// 	else {
	// 		console.log("fromAdress är undefined"); 
	// 		fromAdress = " "; 
	// 	}

	// 	console.log("fromAdress (i initMap) HATA --->", fromAdress);

	// 	$scope.directions = {
	// 		origin: fromAdress,
	// 		destination: $scope.destination,
	// 		showList: true
	// 	};	


		
	// };

	// $scope.getGeoCoder = function() {
	// 	console.log("Inne i getGeoCoder"); 
	// 	var geocoder = new google.maps.Geocoder();
 //        var latlng = new google.maps.LatLng($scope.lat, $scope.long);

 //        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
 //        	console.log("Inne i geocode.geocode"); 
 //            if (status == google.maps.GeocoderStatus.OK) {
 //                if (results[1]) {
 //                	$scope.fromAdress = results[1].formatted_address.toString(); 
 //                	console.log("$scope.fromAdress (i getGeoCoder) HATA ---> ", $scope.fromAdress); 
	// 				// $scope.initMap($scope.long, $scope.lat, $scope.fromAdress); 
                	
 //                } else {
 //                    console.log('Location not found');
 //                }
 //            } else {
 //            	console.log('Geocoder failed due to: ' + status);
 //        	}
 //    	});
	// };

	
	// // get directions using google maps api
	// $scope.getDirections = function () {
	// 	console.log("Inne i getDirections"); 

	// 	navigator.geolocation.getCurrentPosition(function(position){
	// 		var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	// 		$scope.long = position.coords.longitude.toString();
	//     	$scope.lat = position.coords.latitude.toString();
	// 		$scope.$apply(function(){
	// 	        console.log("$scope.long (i navigator.geolocation): ", $scope.long);
	// 	        console.log("$scope.lat: (i navigator.geolocation)", $scope.lat);
	//   		});
	// 	});

	// 	$scope.initMap($scope.long, $scope.lat, $scope.fromAdress); 

	//     var request = {
	//       origin: $scope.directions.origin,
	//       destination: $scope.directions.destination,
	//       travelMode: google.maps.DirectionsTravelMode.TRANSIT
	//     };

 //    	$scope.getGeoCoder(); 

	// 	// console.log("results[1].formatted_address: ",  results[1].formatted_address);

 //        // $scope.latOrigin = $scope.lat.toString(); 

	//     directionsService.route(request, function (response, status) {
	//       // if (status === google.maps.DirectionsStatus.OK) {
	// 	    	console.log("If");
	// 	      	var geocoder = new google.maps.Geocoder();
	// 	    	$scope.getGeoCoder(); 
	// 	    	console.log("$scope.fromAdress (i if): ", $scope.fromAdress); 
	// 	        $scope.showMarker = true;
	// 	        directionsDisplay.setDirections(response);
	// 	        directionsDisplay.setMap($scope.map.control.getGMap());
	// 	        directionsDisplay.setPanel(document.getElementById('directionsList'));

	//       // } else {
	// 	    	// console.log("Else");
	// 	     //    $scope.showMarker = true;
	// 	     //    console.log("$scope.marker: ", $scope.marker); 
	//       // }
	//     });
 //  	};

}]);