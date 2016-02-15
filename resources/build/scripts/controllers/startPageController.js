app.controller('startPageController', ['$scope','$http', 'instagram',  function($scope, $http, instagram){
	console.log("Inne i startPageController");

	$scope.instaTokenVvZ = '20902211';
	$scope.instaTokenSth = '406306036';
	$scope.instaTokenNN = '6847274'; 

	
	$scope.initInsta = function() {
		console.log("initInsta"); 
		$("#InstaContainer").instastream({
			instaToken: '20902211.1677ed0.328409468c4b440d87971179adb2e4dd',
			instaUser: $scope.instaTokenVvZ,
			instaResults: 10,
			instaMenu: 'yes'
		});
	};


}]);