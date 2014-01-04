angular.module('AngularBlackBelt.flowplayer', ['directives/flowplayer/flowplayer.tpl.html','directives/flowplayer/flowplayerSlideshow.tpl.html'])
.directive('flowplayer', ['$sce', '$compile', '$templateCache', function($sce, $compile, $templateCache) {
    return {
        restrict: 'A',
        scope: {
            videoConfig: '='
        },
        compile: function(tElem,tAttrs){

            if (!tAttrs.templateUrl){
                 throw new Error('Must Give flowplayer a templateUrl to look for.');
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
                    setTimeout(function(){
                      mediaPlayer = newElement[attrs.mediaType](scope.videoConfig.options);
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
}]);