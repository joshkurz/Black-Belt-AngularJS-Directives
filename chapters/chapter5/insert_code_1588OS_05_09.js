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