
angular.module('AngularBlackBelt.demo', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'directives/demo/stopLight/stopLightView.tpl.html', 'directives/demo/stopwatch/stopwatchDemo.tpl.html', 'AngularBlackBelt.demo/stopLight', 'AngularBlackBelt.demo/stopwatch', 'AngularBlackBelt.demo/treeNodes', 'directives/demo/animations/animations.tpl.html', 'directives/demo/homepage.tpl.html'])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(false);
  $routeProvider.otherwise({redirectTo:'/'});

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

  $routeProvider.when('/stockchart', {
    templateUrl:'directives/demo/BigData/stockchartView.tpl.html',
    controller:'BigDataCtrl'
  });

  $routeProvider.when('/animations', {
    templateUrl:'directives/demo/animations/animations.tpl.html',
    controller:'animationsCtrl'
  });

  $routeProvider.when('/d3map', {
    templateUrl:'directives/demo/heatMap/heatMapDemo.tpl.html',
    controller:'demoHeatMapCtrl'
  });

  $routeProvider.when('/timeline', {
    templateUrl:'directives/demo/timeline/timelineDemo.tpl.html',
    controller:'demoTimelineCtrl'
  });

  $routeProvider.when('/', {
    templateUrl:'directives/demo/homepage.tpl.html',
    controller:'demoCtrl'
  });

}]);



angular.module('AngularBlackBelt.demo').controller('demoCtrl', ['$scope', '$location', '$rootScope',
  function ($scope, $location, $rootScope) {
    $scope.currentRoute = $location.path();

    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
      $scope.currentRoute = $location.path();
    });
}]);