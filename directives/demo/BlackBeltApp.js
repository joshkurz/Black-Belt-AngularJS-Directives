
angular.module('AngularBlackBelt.demo', ['ngRoute', 'directives/demo/stopLightView.tpl.html', 'directives/demo/stopwatchView.tpl.html', 'AngularBlackBelt.StopWatchDemo', 'AngularBlackBelt.StopLightDemo', 'AngularBlackBelt.html5PlayerDemo'])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(false);
  $routeProvider.otherwise({redirectTo:'/stopwatch'});

  $routeProvider.when('/stopwatch', {
    templateUrl:'directives/demo/stopwatchView.tpl.html',
    controller:'demoStopwatchCtrl'
  });

  $routeProvider.when('/stoplight', {
    templateUrl:'directives/demo/stopLightView.tpl.html',
    controller:'demoStopLightCtrl'
  });

  $routeProvider.when('/html5player', {
    templateUrl:'directives/demo/htmlPlayerDemo.tpl.html',
    controller:'htmlPlayerCtrl'
  });

}]);



angular.module('AngularBlackBelt.demo').controller('demoCtrl', ['$scope', '$location', '$rootScope',
  function ($scope, $location, $rootScope) {
    $scope.currentRoute = $location.path();

    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
      $scope.currentRoute = $location.path();
    });
}]);