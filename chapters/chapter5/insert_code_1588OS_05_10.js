angular.module('broadcastingDirectives', [])
.directive('bbBroadcastPlayer', ['$rootScope',
  function ($rootScope) {
    return {
      restrict: 'A',
      replace: false,
      scope: true,
      templateUrl: 'directives/communicationExamples/playerTemplate.tpl.html',
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