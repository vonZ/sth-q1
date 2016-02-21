app.directive('showDuringResolve', ['$rootScope', function($rootScope) {

  return {
    link: function(scope, element) {

      element.addClass('ng-hide');

      var unregister = $rootScope.$on('$routeChangeStart', function() {
        element.removeClass('ng-hide');
      });

      scope.$on('$destroy', unregister);
    }
  };
}]);