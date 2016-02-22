//Controller
app.controller('mainController', ['$scope','$http','$state', '$rootScope', '$window',  function($scope, $http, $state, $rootScope, $window){
	console.log("Inne i mainCtrl");

	$scope.getMenu = function () {
        $http.get('navData.json').success(function (result) {
            $scope.menuItems = result;
            console.log("$scope.getMenu: ", $scope.menuItems); 
        });
    };

    $scope.getMenu(); 

 	$scope.currentMenuItem = function(currentPath) {
		$scope.currentPath = currentPath;
		if (window.location.href.indexOf($scope.currentPath) > -1) {
			return "currentPath";
		}
	};

	$rootScope.$on('$stateChangeStart', 
	function(event, toState, toParams, fromState, fromParams){ 
	    console.log("State change"); 
	    $scope.isRespMenuOpen = false;  
	}); 

	// $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
 //    if (toState.resolve) {

 //    	console.log("loading");
 //        loading = true; 
 //    }
	// });
	// $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
	//     if (toState.resolve) {
 //    		console.log("not loading");
 //        	loading = false; 
	//     }
	// });




}]);