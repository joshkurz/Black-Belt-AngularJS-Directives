angular.module('AngularBlackBelt.mediaPlayer', ['directives/mediaPlayer/flowplayer.tpl.html','directives/mediaPlayer/flowplayerSlideshow.tpl.html'])
.directive('mediaPlayer', ['$sce', '$compile', '$templateCache', '$timeout', function($sce, $compile, $templateCache, $timeout) {
    return {
        restrict: 'A',
        scope: {
            videoConfig: '='
        },
        compile: function(tElem,tAttrs){

            if (!tAttrs.templateUrl){
                 throw new Error('Must Give media-player a templateUrl to look for.');
            }
            
            return function(scope, element, attrs) {
                
                if (typeof scope.videoConfig !== 'object'){
                     throw new Error('videoConfig must be an object');
                }

                var newElement,
                    mediaPlayer;

                function getConfigurations(){
                    scope.videoConfig.templateUrl = attrs.templateUrl;
                    return scope.videoConfig;
                }

                scope.trustSrc = function(filePath,ext) {
                    return $sce.trustAsResourceUrl(filePath + ext);
                };
                
                function init(){
                    newElement = $compile($templateCache.get(attrs.templateUrl).trim())(scope);
                    element.html('').append(newElement);
                    $timeout(function(){
                      if(attrs.mediaType){
                        mediaPlayer = newElement[attrs.mediaType](scope.videoConfig.options);
                      }
                    });
                }

                scope.$watch(getConfigurations, function(newV,oldV) {
                    init();
                },true);

                scope.$on('$destroy', function(node){
                  if(mediaPlayer.remove){
                    mediaPlayer.remove();
                  }
                  mediaPlayer = null;
                  element.html('');
                });

            };
        }
    };
}]).directive('ngPoster', function() {
    return {
        restrict: 'A',
        compile: function(tElem,tAttrs){
            
            return function(scope, element, attrs) {            
                attrs.$observe('ngPoster', function(newv,oldv){
                  console.log(attrs.ngPoster);
                  attrs.$set('poster', attrs.ngPoster);
                });
            };
        }
    };
});