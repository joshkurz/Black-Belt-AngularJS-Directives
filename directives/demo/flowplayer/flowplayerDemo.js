angular.module('AngularBlackBelt.demo/flowplayer', ['directives/demo/flowplayer/flowplayerDemo.tpl.html'])
.controller('flowplayerCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){

    var activeVideo = $location.search().activeVideo;

    $scope.videos = [
      {
          clip: {
              url: 'https://ia700404.us.archive.org/11/items/LovingYouandDrinkingBeer/LovingYouandDrinkingBeer_512kb.mp4',
              autoPlay: true,
              autoBuffering: true
          },
          thumbnail: 'http://i1.ytimg.com/vi/xwTF6bEfxBk/mqdefault.jpg',
          title: 'Loving You And Drinking Beer'
      },
      {
          clip: {
              url: 'https://ia700701.us.archive.org/21/items/TomAndJerryInANightBeforeChristmas/TomAndJerry-003-NightBeforeChristmas1941.mp4',
              autoPlay: true,
              autoBuffering: true
          },
          thumbnail: 'http://upload.wikimedia.org/wikipedia/en/b/b7/Tomandjerrytitle003.jpg',
          title: 'Tom and Jerry in A Night Before Christmas'
      },
      {
          clip: {
              url: 'https://ia700703.us.archive.org/5/items/TheAmericanDreamFilm-FullLength/TheAmericanDreamFilm-fullLength.mp4',
              autoPlay: true,
              autoBuffering: true
          },
          thumbnail: 'http://www.theamericandreamfilm.com/images/home/logo.png',
          title: 'The American Dream'
      }
    ];

    $scope.videoSearch = function(youtubeTitle) {
      return $http.jsonp("https://gdata.youtube.com/feeds/api/videos?alt=json-in-script&orderby=viewCount&start-index=11&max-results=30&v=2&callback=JSON_CALLBACK&q="+youtubeTitle).then(function(response){
        return response.data.feed.entry;
      });
    };
    
    $scope.setActiveVideo = function(index){
      $scope.activeVideo = $scope.videos[index];
      $location.search('activeVideo', index);
    };

    $scope.$watch('result', function(newV, oldV){
       if(typeof newV === 'object' && newV !== oldV){
         $scope.activeVideo = {
          filePath: $scope.result.content.src,
          template: 'directives/html5Player/youtubeHtml5Player.tpl.html',
          thumbnail: $scope.result['media$group']['media$thumbnail'][0].url.split('?')[0],
          title: $scope.result.title.$t
         };
       }
    });

    $scope.activeVideo = $scope.videos[activeVideo?activeVideo:0];
}]);