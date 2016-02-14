app.factory('instagram', ['$http', function($http){

	return {
		fetchPhotos: function(callback){
			var CLIENT_ID = '66bb9475b77d4f6e846384c2ea92179e';
			var endpoint = "https://api.instagram.com/v1/users/20902211/media/recent/?";
			endpoint += "?count=99";
			endpoint += "&client_id=" + CLIENT_ID;
			endpoint += "&callback=JSON_CALLBACK";
			$http.jsonp(endpoint).success(function(response){
			  callback(response.data);
			});
		}
	};

}]);