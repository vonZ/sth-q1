//Controller
app.controller('mainController', ['$scope','$http','$state', '$timeout', '$rootScope', '$window',  function($scope, $http, $state, $timeout, $rootScope, $window){
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
	    $scope.isStateChange = true; 
	    $scope.isRespMenuOpen = false;  

    	$timeout(function() {
	    	$scope.isStateChange = false; 
    	}, 800);

	}); 

}]);