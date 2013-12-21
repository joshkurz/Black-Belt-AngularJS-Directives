angular.module('AngularBlackBelt.html5Player', ['directives/htmlPlayer/html5Player.tpl.html', 'directives/htmlPlayer/youtubeHtml5Player.tpl.html'])
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
        link: {
                pre: function(scope,element,attrs){
                    scope.trustSrc = function(ext) {
                      return $sce.trustAsResourceUrl(scope.videoConfig.filePath + ext);
                    };
                },
                post: function(scope, element, attrs) {
                 
                  setTimeout(function(){element.mediaelementplayer();},1000);
                }
        }
    };
}]);