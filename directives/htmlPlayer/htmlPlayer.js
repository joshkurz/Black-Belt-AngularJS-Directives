angular.module('AngularBlackBelt.htmlPlayer', ['directives/htmlPlayer/htmlPlayer.tpl.html', 'directives/htmlPlayer/youtubeHtmlPlayer.tpl.html'])
.directive('htmlPlayer', ['$sce',function($sce) {
    return {
        restrict: 'A',
        templateUrl: function(tElem, tAttrs){

            if (!tAttrs.templateUrl){
                 throw new Error('Must Give the htmlPlayer a templateUrl to look for.');
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