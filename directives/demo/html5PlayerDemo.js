angular.module('AngularBlackBelt.html5PlayerDemo', ['directives/demo/html5PlayerDemo.tpl.html'])
.controller('html5PlayerCtrl', ['$scope', function($scope){
    $scope.videos = [
      {
       filePath: 'http://mediaelementjs.com/media/echo-hereweare', 
       template: 'directives/html5Player/html5Player.tpl.html',
       thumbnail: 'http://mediaelementjs.com/media/echo-hereweare-540x304.jpg'
      },
      {
       filePath: 'http://www.youtube.com/watch?v=nOEw9iiopwI', 
       template: 'directives/html5Player/youtubeHtml5Player.tpl.html',
       thumbnail: 'http://img.youtube.com/vi/nOEw9iiopwI/0.jpg'
      },
      {
       filePath: 'http://www.youtube.com/watch?v=6v2L2UGZJAM', 
       template: 'directives/html5Player/youtubeHtml5Player.tpl.html',
       thumbnail: 'http://img.youtube.com/vi/6v2L2UGZJAM/0.jpg'
      }
    ];

    $scope.activeVideo = $scope.videos[1];
}]);