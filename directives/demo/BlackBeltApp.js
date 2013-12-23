
angular.module('AngularBlackBelt.demo', ['ngRoute', 'ui.bootstrap', 'directives/demo/stopLight/stopLightView.tpl.html', 'directives/demo/stopwatch/stopwatchDemo.tpl.html', 'AngularBlackBelt.demo/stopLight', 'AngularBlackBelt.demo/stopwatch', 'AngularBlackBelt.demo/html5Player'])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(false);
  $routeProvider.otherwise({redirectTo:'/stopwatch'});

  $routeProvider.when('/stopwatch', {
    templateUrl:'directives/demo/stopwatch/stopwatchDemo.tpl.html',
    controller:'demoStopwatchCtrl'
  });

  $routeProvider.when('/stoplight', {
    templateUrl:'directives/demo/stopLight/stopLightView.tpl.html',
    controller:'demoStopLightCtrl'
  });

  $routeProvider.when('/html5player', {
    templateUrl:'directives/demo/html5Player/html5PlayerDemo.tpl.html',
    reloadOnSearch: false,
    controller:'html5PlayerCtrl'
  });

  $routeProvider.when('/flowplayer', {
    templateUrl:'directives/demo/flowplayer/flowplayerDemo.tpl.html',
    reloadOnSearch: false,
    controller:'flowplayerCtrl'
  });

}]);



angular.module('AngularBlackBelt.demo').controller('demoCtrl', ['$scope', '$location', '$rootScope',
  function ($scope, $location, $rootScope) {
    $scope.currentRoute = $location.path();

    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
      $scope.currentRoute = $location.path();
    });
}]);