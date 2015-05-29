angular.module('AngularBlackBelt.demo/mediaelement', ['directives/demo/mediaelement/mediaelementView.tpl.html'])
.controller('mediaelementCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){

    var search = $location.search(),
        activeVideo = search.activeVideo,
        activeYoutubeVideo = search.youtube;

    var QUERY = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&key=AIzaSyCK1kB2dMz_L05EuIMyLZWnTXxYnjS1-cM&type=video&callback=JSON_CALLBACK&q=";

    $scope.videos = [
      {
       filePath: 'https://ia700404.us.archive.org/11/items/LovingYouandDrinkingBeer/LovingYouandDrinkingBeer_512kb', 
       thumbnail: 'http://i1.ytimg.com/vi/xwTF6bEfxBk/mqdefault.jpg',
       title: 'Loving You And Drinking Beer'
      },
      {
       filePath: 'https://ia700701.us.archive.org/21/items/TomAndJerryInANightBeforeChristmas/TomAndJerry-003-NightBeforeChristmas1941', 
       thumbnail: 'http://upload.wikimedia.org/wikipedia/en/b/b7/Tomandjerrytitle003.jpg',
       title: 'Tom and Jerry in A Night Before Christmas'
      },
      {
       filePath: 'https://ia600302.us.archive.org/22/items/Herman_CheeseBurglar/Herman_CheeseBurglar_512kb', 
       thumbnail: 'http://i1.ytimg.com/vi/Q9NLrobVDMg/hqdefault.jpg',
       title: 'Herman CheeseBurglar'
      }
    ];

    $scope.videoSearch = function(youtubeTitle) {
      return $http.jsonp(QUERY+youtubeTitle).then(function(response){
        return response.data.items;
      });
    };

    $scope.watchRtmp = function(src) {
      $scope.activeVideo = {src: (typeof src === String && src.indexOf('rtmp') !== -1 ) ? decodeURIComponent(src) : "rtmp://45.55.189.251/live/cashmoney", 
                            thumbnail: '/dist/images/OBS.png',
                            options: {}, isRTMP: true};
      $location.search('youtube', null);
      $location.search('activeVideo', null);
      $location.search('stream', true);
      $scope.currentMediaPlayer = "directives/mediaelement/mediaelementRTMP.tpl.html";
    };
    
    $scope.setActiveVideo = function(index){
      $scope.activeVideo = $scope.videos[index];
      $location.search('stream', null);
      $location.search('youtube', null);
      $location.search('activeVideo', index);
      $scope.currentMediaPlayer = "directives/mediaelement/mediaelement.tpl.html";
    };

    $scope.$watch('result', function(newV, oldV){
       if(typeof newV === 'object' && newV !== oldV){
         var id = newV.id.videoId;
         var src = 'https://www.youtube.com/watch?v=' + id;
         $scope.activeVideo = {
          filePath: src,
          thumbnail: newV.snippet.thumbnails['default'],
          title: newV.snippet.title
         };
         $location.search('stream', null);
         $location.search('activeVideo', null);
         $location.search('youtube', id);
         $scope.currentMediaPlayer = "directives/mediaelement/youtubeMediaelementPlayer.tpl.html";
       }
    });

    console.log(search.stream)

    if (search.stream) {
      $scope.watchRtmp(search.stream);
    } else if(!activeYoutubeVideo){
      $scope.currentMediaPlayer = "directives/mediaelement/mediaelement.tpl.html";
      $scope.activeVideo = $scope.videos[activeVideo?activeVideo:1];
    } else {
      $scope.currentMediaPlayer = "directives/mediaelement/youtubeMediaelementPlayer.tpl.html";
      $scope.activeVideo = {
        filePath: 'http://www.youtube.com/watch?v=' + activeYoutubeVideo
      };
    }
}]);