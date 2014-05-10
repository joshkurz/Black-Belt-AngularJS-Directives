angular.module('AngularBlackBelt.demo/flowplayer', ['directives/demo/flowplayer/flowplayerDemo.tpl.html'])
.controller('flowplayerCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){

    var activeVideo = $location.search().activeVideo;
    
    $scope.mediaType = "flowplayer";
    $scope.currentFlowplayer = 'directives/mediaPlayer/flowplayerSlideshow.tpl.html';
    $scope.buttonText = "Playlist Player";   

    $scope.videos = [
      {
        options: {},
        playlist: [
           "http://archive.org/download/Superman-1941/Cartoon-SupermanBLP-VCD",
           "https://ia600301.us.archive.org/29/items/KevinBatman/Batman_Dead_End_512kb",
           "https://ia601200.us.archive.org/26/items/Tom.and.Jerry/Tom.and.Jerry.%26.The.Wizard.of.Oz.2011.1080p.BluRay.x264-DON",
           "https://ia600302.us.archive.org/32/items/StarWarsGangsterRap/StarWarsGangstaRap_512kb"
        ]
      },
      {
        options: {},
        playlist: [
           "https://ia700701.us.archive.org/21/items/TomAndJerryInANightBeforeChristmas/TomAndJerry-003-NightBeforeChristmas1941",
           "http://archive.org/download/Superman-1941/Cartoon-SupermanBLP-VCD"
        ]
      }
    ];

    $scope.changeFlowPlayer = function(template){
      $scope.currentFlowplayer = template;
      if(template === 'directives/mediaPlayer/pureHtml5Player.tpl.html'){
        $scope.mediaType = '';
      } else {
        $scope.mediaType = "flowplayer";
      }
    };
    
    $scope.setActiveVideo = function(index){
      $scope.activeVideo = $scope.videos[index];
      $location.search('activeVideo', index);
    };

    $scope.activeVideo = $scope.videos[activeVideo?activeVideo:0];
    
}]);