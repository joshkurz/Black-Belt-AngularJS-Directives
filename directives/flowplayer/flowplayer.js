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
                    return JSON.stringify(scope.videoConfig);
                }

                scope.trustSrc = function(ext) {
                    return $sce.trustAsResourceUrl(scope.videoConfig.playlist[0] + ext);
                };

                scope.$watch(getSrc, function(newV,oldV) {
                    newElement = $compile($templateCache.get(attrs.templateUrl).trim())(scope);
                    element.html('');
                    element.append(newElement);
                    setTimeout(function(){
                       newElement.flowplayer(scope.videoConfig.options);
                    });
                });

            };
        }
    };
}]);