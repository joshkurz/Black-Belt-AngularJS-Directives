describe('bbPlayer', function () {
  
  //These are integration tests. 
  //bbPlayer relies on bbPlayerContainer to allow for cross directive communication
  //bbBroadcastPlayer relies on other bbBroadcastPlayer directives to be present to prove it works correctly
  var scope, $compile, ctrl, $interval;

  beforeEach(module('broadcastingDirectives', 'directives/communicationExamples/playerTemplate.tpl.html'));
  beforeEach(module('controllerPlayers'));
  beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $controller = _$controller_;
  }));

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

  describe('Broadcasting events between the players', function () {

    var controllerPlayer;

    beforeEach(function(){
      var integration = angular.element('<div>' + 
                                    '<div class="player" bb-broadcast-player></div>' +
                                    '<div class="player" bb-broadcast-player></div>' +
                                    '<div class="player" bb-broadcast-player></div>' +
                                    '<div class="player" bb-broadcast-player></div>' +
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

});
