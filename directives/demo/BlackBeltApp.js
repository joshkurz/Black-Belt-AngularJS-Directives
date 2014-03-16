
angular.module('AngularBlackBelt.demo', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'directives/demo/stopLight/stopLightView.tpl.html', 'directives/demo/stopwatch/stopwatchDemo.tpl.html', 'AngularBlackBelt.demo/stopLight', 'AngularBlackBelt.demo/stopwatch', 'AngularBlackBelt.demo/treeNodes', 'directives/demo/animations/animations.tpl.html'])

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

  $routeProvider.when('/mediaelement', {
    templateUrl:'directives/demo/mediaelement/mediaelementView.tpl.html',
    reloadOnSearch: false,
    controller:'mediaelementCtrl'
  });

  $routeProvider.when('/flowplayer', {
    templateUrl:'directives/demo/flowplayer/flowplayerDemo.tpl.html',
    reloadOnSearch: false,
    controller:'flowplayerCtrl'
  });

  $routeProvider.when('/treeNodes', {
    templateUrl:'directives/demo/treeNodes/treeNodesDemo.tpl.html',
    controller:'TreeNodesCtrl'
  });

  $routeProvider.when('/bigdata', {
    templateUrl:'directives/demo/BigData/bigDataView.tpl.html',
    controller:'BigDataCtrl'
  });

  $routeProvider.when('/animations', {
    templateUrl:'directives/demo/animations/animations.tpl.html',
    controller:'animationsCtrl'
  });

}]);



angular.module('AngularBlackBelt.demo').controller('demoCtrl', ['$scope', '$location', '$rootScope',
  function ($scope, $location, $rootScope) {
    $scope.currentRoute = $location.path();

    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
      $scope.currentRoute = $location.path();
    });
}]);