angular.module('AngularBlackBelt.htmlPlayerDemo', ['directives/demo/htmlPlayerDemo.tpl.html'])
.controller('htmlPlayerCtrl', ['$scope', function($scope){
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