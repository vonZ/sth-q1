//Controller
app.controller('mainController', ['$scope','$http', '$state',  function($scope, $http, $state){
	console.log("Inne i mainCtrl");

	// $scope.menuItems = ['Hem', 'Om oss', 'Hitta hit', 'Priser'];

	// $scope.setPage = function (page) {
 //        $state.transitionTo(page);
 //    };

 	//Current select in menu
    $scope.getClass = function(path) {
        if ($location.path().substr(0, path.length) == path) {
          return "active";
        } else {
            return "";
        }
    };


}]);