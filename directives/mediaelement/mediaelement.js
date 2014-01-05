angular.module('AngularBlackBelt.mediaelement', ['directives/mediaelement/mediaelement.tpl.html', 'directives/mediaelement/youtubeMediaelementPlayer.tpl.html']);
// .directive('mediaelement', ['$sce', '$compile', '$templateCache', function($sce, $compile, $templateCache) {
//     return {
//         restrict: 'A',
//         replace: true,
//         scope: {
//             videoConfig: '='
//         },
//         compile: function(tElem,tAttrs){
            
//             return function(scope, element, attrs) {
                
//                 if (typeof scope.videoConfig !== 'object' || !scope.videoConfig.filePath || !scope.videoConfig.template){
//                      throw new Error('Must Give a correct videoCofig object with a template and filePath');
//                 }
            
//                 var mediaelement,
//                     newElement;

//                 function getSrc(){
//                     if(scope.videoConfig){
//                       return scope.videoConfig.filePath;
//                     }
//                 }

//                 scope.trustSrc = function(ext) {
//                     if(scope.videoConfig){
//                       return $sce.trustAsResourceUrl(scope.videoConfig.filePath + ext);
//                     }
//                 };
                
//                 scope.$watch(getSrc, function(newV,oldV) {
//                     newElement = $compile($templateCache.get(scope.videoConfig.template).trim())(scope);
//                     element.html('');
//                     element.append(newElement);
//                     setTimeout(function(){
//                       mediaelement = newElement.mediaelementplayer();
//                     });
//                 });

//                 scope.$on('$destroy', function(node){
//                   mediaelement.remove();
//                   element.html('');
//                 });
//             };
//         }
//     };
// }]);