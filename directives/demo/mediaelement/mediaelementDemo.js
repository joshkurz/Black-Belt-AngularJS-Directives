angular.module('AngularBlackBelt.demo/mediaelement', ['directives/demo/mediaelement/mediaelementView.tpl.html'])
.controller('mediaelementCtrl', ['$scope', '$location', '$http', function($scope, $location, $http){

    var activeVideo = $location.search().activeVideo;
    var activeYoutubeVideo = $location.search().youtube;

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
      return $http.jsonp("https://gdata.youtube.com/feeds/api/videos?alt=json-in-script&start-index=11&max-results=30&v=2&callback=JSON_CALLBACK&q="+youtubeTitle).then(function(response){
        return response.data.feed.entry;
      });
    };
    
    $scope.setActiveVideo = function(index){
      $scope.activeVideo = $scope.videos[index];
      $location.search('activeVideo', index);
      $scope.currentMediaPlayer = "directives/mediaelement/mediaelement.tpl.html";
    };

    $scope.$watch('result', function(newV, oldV){
       if(typeof newV === 'object' && newV !== oldV){
         var src = $scope.result.content.src.split('?')[0];
         var splitArray = $scope.result.content.src.split('/');
         var token = splitArray[splitArray.length-1].split('?')[0];
         src = 'http://www.youtube.com/watch?v=' + token;
         $scope.activeVideo = {
          filePath: src,
          thumbnail: $scope.result['media$group']['media$thumbnail'][0].url,
          title: $scope.result.title.$t
         };
         $location.search('youtube', token);
         $scope.currentMediaPlayer = "directives/mediaelement/youtubeMediaelementPlayer.tpl.html";
       }
    });

    if(!activeYoutubeVideo){
      $scope.currentMediaPlayer = "directives/mediaelement/mediaelement.tpl.html";
      $scope.activeVideo = $scope.videos[activeVideo?activeVideo:1];
    } else {
      $scope.currentMediaPlayer = "directives/mediaelement/youtubeMediaelementPlayer.tpl.html";
      $scope.activeVideo = {
        filePath: 'http://www.youtube.com/watch?v=' + activeYoutubeVideo
      };
    }
}]);