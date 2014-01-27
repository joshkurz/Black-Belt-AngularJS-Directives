//http://jsfiddle.net/joshkurz/B8x3Q/4/
angular.module('broadcastingDirectives', [])
.directive('bbBroadcastPlayer', ['$rootScope', 
    function ($rootScope) {
        return {
            restrict: 'A',
            replace: false,
            scope: true,
            templateUrl: function(tElem, tAttrs){
              if (!tAttrs.template){
                 throw new Error('Must Give bbPlayer a template to render.');
              }
              return tAttrs.template;
            },
            link: function (scope, iElement, iAttrs, controller) {
                
                scope.player = {isPlaying : 'no'} ;
               
                scope.play = function() {
                    $rootScope.$broadcast('turnOff');
                    scope.player.isPlaying = 'yes' ;
                };
                
                scope.$on('turnOff', function(event){
                    scope.player.isPlaying = 'no';
                });
            }
        };
    }
]);
