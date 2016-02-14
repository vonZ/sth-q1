//Route provider
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
    .state('home', {
            url: '/home',
            templateUrl: 'partials/startPage.html',
            controller: 'startPageController'
        })
        
        .state('about', {
            url: '/om-oss',
            templateUrl: 'partials/aboutUs.html',
            controller: 'aboutUsPageController'
        })

        .state('findUs', {
            url: '/hitta-hit',
            templateUrl: 'partials/findUs.html',
            controller: 'aboutUsPageController'
        })

        .state('prices', {
            url: '/priser',
            templateUrl: 'partials/prices.html',
            controller: 'aboutUsPageController'
        });
}]);