//Controller
app.controller('mainController', ['$scope','$http', '$state',  function($scope, $http, $state){
	console.log("Inne i mainCtrl");

	// $scope.menuItems = ['Hem', 'Om oss', 'Hitta hit', 'Priser'];

	$scope.getMenu = function () {
        $http.get('navData.json').success(function (result) {
            $scope.menuItems = result;
            console.log("$scope.getMenu: ", $scope.items); 
        });
    };

    $scope.getMenu(); 

	// $scope.setPage = function (page) {
 //        $state.transitionTo(page);
 //    };

 	$scope.currentMenuItem = function(currentPath) {
		$scope.currentPath = currentPath;
		if (window.location.href.indexOf($scope.currentPath) > -1) {
			return "currentPath";
		}
	};

 	//Current select in menu
    // $scope.currentMenuItem = function(path) {
    //     if ($location.path().substr(0, path.length) == path) {
    //       return "active";
    //     } else {
    //         return "";
    //     }
    // };


}]);