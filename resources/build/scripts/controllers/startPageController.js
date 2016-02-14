app.controller('startPageController', ['$scope','$http', 'instagram',  function($scope, $http, instagram){
	console.log("Inne i startPageController");
	$scope.data = {};
	$scope.pics = [];

	instagram.fetchPhotos(function(data){
      $scope.pics = data;
      console.log("data: ", data); 
    });

}]);