//Route provider
app

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/hem');
    
    $stateProvider
    .state('home', {
        url: '/hem',
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
        controller: 'findUsPageController'
    })

    .state('prices', {
        url: '/priser',
        templateUrl: 'partials/prices.html',
        controller: 'aboutUsPageController'
    });

    //     var home = {
    //             name: 'home',
    //             url: '/',
    //             templateUrl: 'partials/startPage.html',
    //             controller: 'startPageController'
    //         },
    //         aboutUs = {
    //             name: 'Om oss',
    //             url: 'aboutUs',
    //             parent: home,
    //             templateUrl: 'partials/aboutUs.html',
    //             controller: 'aboutUsPageController'
    //         },
    //         findUs = {
    //             name: 'Hitta hit',
    //             url: 'findUs',
    //             parent: home,
    //             templateUrl: 'partials/findUs.html',
    //             controller: 'aboutUsPageController'
    //         },
    //         prices = {
    //             name: 'Priser',
    //             url: 'prices',
    //             parent: home,
    //             templateUrl: 'partials/prices.html',
    //             controller: 'aboutUsPageController'
    //         };
    
    //     $stateProvider.state(home);
    //     $stateProvider.state(aboutUs);
    //     $stateProvider.state(findUs);
    //     $stateProvider.state(prices);
    // }])

    // .run(['$state', function ($state) {
    //    $state.transitionTo('home'); 
    // }]);
//     .run(['$state', function ($state) {
//        $state.transitionTo('home'); 
//     }])

}]);
