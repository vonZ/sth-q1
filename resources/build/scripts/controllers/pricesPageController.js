app.controller('pricesPageController', ['$scope','$http',  function($scope, $http){
	console.log("Inne i pricesPageController");

	$scope.getPriceList = function () {
        $http.get('priceList.json').success(function (result) {
            $scope.priceList = result;
            console.log("$scope.priceList: ", $scope.priceList); 
        });
    };

    $scope.getPriceList(); 

}]);