describe('Using a parent controller to maintain the state of the players', function () {

    var controllerPlayer;

    beforeEach(function(){
      var integration = angular.element('<div bb-player-container>' + 
                                    '<div class="player" bb-player></div>' +
                                    '<div class="player" bb-player></div>' +
                                    '<div class="player" bb-player></div>' +
                                    '<div class="player" bb-player></div>' +
                                  '</div>');

      controllerPlayer = $compile(integration)(scope);
      scope.$apply();
    });

    it('Should start out with its text reading no and then once clicked change it to yes.', function(){
      var bbPlayer = $(controllerPlayer.find('.player')[0]);
      expect(bbPlayer.text().trim()).toBe('is playing: no');
      bbPlayer .find('.btn').click();
      expect(bbPlayer.text().trim()).toBe('is playing: yes');
    });

    it('Should only ever have one yes at a given time', function(){
      var players = controllerPlayer.find('.player');
      var bbPlayer1 = $(players[0]);
      var bbPlayer2 = $(players[1]);
      var bbPlayer3 = $(players[2]);
      var bbPlayer4 = $(players[3]);
      expect(bbPlayer1.text().trim()).toBe('is playing: no');
      expect(bbPlayer2.text().trim()).toBe('is playing: no');
      expect(bbPlayer3.text().trim()).toBe('is playing: no');
      expect(bbPlayer4.text().trim()).toBe('is playing: no');
      bbPlayer1.find('.btn').click();
      expect(bbPlayer1.text().trim()).toBe('is playing: yes');
      expect(bbPlayer2.text().trim()).toBe('is playing: no');
      expect(bbPlayer3.text().trim()).toBe('is playing: no');
      expect(bbPlayer4.text().trim()).toBe('is playing: no');
      bbPlayer3.find('.btn').click();
      expect(bbPlayer1.text().trim()).toBe('is playing: no');
      expect(bbPlayer2.text().trim()).toBe('is playing: no');
      expect(bbPlayer3.text().trim()).toBe('is playing: yes');
      expect(bbPlayer4.text().trim()).toBe('is playing: no');
    });

});

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
