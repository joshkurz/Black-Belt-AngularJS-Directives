//http://jsfiddle.net/joshkurz/B8x3Q/3/
angular.module('controllerPlayers', [])
.directive('bbPlayer', [
    function () {
        return {
            restrict: 'A',
            replace: false,
            require: '^bbPlayerContainer',
            scope: true,
            templateUrl: 'directives/communicationExamples/playerTemplate.tpl.html',
            link: function (scope, iElement, iAttrs, controller) {
                
                scope.player = {isPlaying : 'no'};
               
                scope.play = function() {
                    controller.turnOffPlayers();
                    scope.player.isPlaying = 'yes' ;
                };
                
                controller.addPlayer(scope.player);
            }
        } ;
    }
]).directive('bbPlayerContainer', [
    function () {
        return {
            restrict: 'A',
            controller: function(){
                
              var players = [];
              this.addPlayer = function(player){
                  players.push(player);
              };
              this.turnOffPlayers = function(){
                  for(var i = 0;i < players.length;i++){
                      players[i].isPlaying = 'no';
                  }
              };
            }
        } ;
    }
]);
