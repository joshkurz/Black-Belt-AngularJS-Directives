angular.module('AngularBlackBelt.html5PlayerDemo', ['directives/demo/html5PlayerDemo.tpl.html'])
.controller('html5PlayerCtrl', ['$scope', function($scope){
    $scope.videos = [
      {
       filePath: 'http://mediaelementjs.com/media/echo-hereweare', 
       playerWidth: '640', 
       playerHeight: '360', 
       objWidth: '500', 
       objHeight: '300'
      },
      {
       filePath: 'http://www.youtube.com/watch?v=nOEw9iiopwI', 
       playerWidth: '640', 
       playerHeight: '360', 
       objWidth: '500', 
       objHeight: '300'
      }
    ];
}]);