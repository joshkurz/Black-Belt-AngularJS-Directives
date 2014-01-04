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

                var newElement;

                function getSrc(){
                    return JSON.stringify(scope.videoConfig) + attrs.templateUrl;
                }

                scope.trustSrc = function(ext) {
                    return $sce.trustAsResourceUrl(scope.videoConfig.playlist[0] + ext);
                };
                
                function init(){
                    newElement = $compile($templateCache.get(attrs.templateUrl).trim())(scope);
                    element.html('').append(newElement);
                    setTimeout(function(){
                       newElement.flowplayer(scope.videoConfig.options);
                    });
                }

                scope.$watch(getSrc, function(newV,oldV) {
                    init();
                });

            };
        }
    };
}]);