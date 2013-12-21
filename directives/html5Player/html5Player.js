angular.module('AngularBlackBelt.html5Player', ['directives/html5Player/html5Player.tpl.html', 'directives/html5Player/youtubeHtml5Player.tpl.html'])
.directive('html5Player', ['$sce',function($sce) {
    return {
        restrict: 'A',
        templateUrl: function(tElem, tAttrs){

            if (!tAttrs.templateUrl){
                 throw new Error('Must Give the html5Player a templateUrl to look for.');
            }
            
            return tAttrs.templateUrl;
        },
        replace: 'element',
        scope: {
            videoConfig: '='
        },
        link: function(scope, element, attrs) {
            

            function getSrc(){
                return scope.videoConfig.filePath;
            }

            scope.trustSrc = function(ext) {
              return $sce.trustAsResourceUrl(scope.videoConfig.filePath + ext);
            };

            scope.$watch(getSrc, function(obj) {
                element.mediaelementplayer();
            });
        }
    };
}]);