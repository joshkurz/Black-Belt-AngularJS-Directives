angular.module('AngularBlackBelt.html5Player', ['directives/html5Player/html5Player.tpl.html', 'directives/html5Player/youtubeHtml5Player.tpl.html'])
.directive('html5Player', ['$sce', '$compile', '$templateCache', function($sce, $compile, $templateCache) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            videoConfig: '='
        },
        compile: function(tElem,tAttrs){
            
            return function(scope, element, attrs) {
                
                if (typeof scope.videoConfig !== 'object' || !scope.videoConfig.filePath || !scope.videoConfig.template){
                     throw new Error('Must Give a correct videoCofig object with a template and filePath');
                }
            
                var mediaelement,
                    newElement;

                function getSrc(){
                    if(scope.videoConfig){
                      return scope.videoConfig.filePath;
                    }
                }

                scope.trustSrc = function(ext) {
                    if(scope.videoConfig){
                      return $sce.trustAsResourceUrl(scope.videoConfig.filePath + ext);
                    }
                };
                
                newElement = $compile($templateCache.get(scope.videoConfig.template).trim())(scope);

                scope.$watch(getSrc, function(newV,oldV) {
                    element.html('');
                    if(scope.videoConfig){
                      newElement = $compile($templateCache.get(scope.videoConfig.template).trim())(scope);
                    }
                    element.append(newElement);
                    setTimeout(function(){
                      mediaelement = newElement.mediaelementplayer();
                    });
                });

                scope.$on('$destroy', function(){
                  mediaelement.remove();
                  element.html('');
                });
            };
        }
    };
}]);