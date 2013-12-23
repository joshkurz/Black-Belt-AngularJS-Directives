angular.module('AngularBlackBelt.flowplayer', ['directives/flowplayer/flowplayer.tpl.html'])
.directive('flowplayer', ['$sce', '$compile', '$templateCache', function($sce, $compile, $templateCache) {
    return {
        restrict: 'A',
        templateUrl: 'directives/flowplayer/flowplayer.tpl.html',
        replace: true,
        scope: {
            videoConfig: '='
        },
        compile: function(tElem,tAttrs){
            
            return function(scope, element, attrs) {
                
                if (typeof scope.videoConfig !== 'object'){
                     throw new Error('videoConfig must be an object');
                }

                var flowplayer;

                function getSrc(){
                    return JSON.stringify(scope.videoConfig);
                }

                scope.$watch(getSrc, function(newV,oldV) {
                    flowplayer = $f(element[0], '../vendor/flowplayer/flowplayer-3.2.18.swf', scope.videoConfig);
                });

                scope.$on('$destroy', function(node){
                  flowplayer.unload();
                });
            };
        }
    };
}]);