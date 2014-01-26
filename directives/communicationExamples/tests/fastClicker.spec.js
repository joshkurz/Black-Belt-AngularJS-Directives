describe('fastClicker', function () {
  
  //These are integration tests. This directive relies on the stopwatch and stopLight directives to be able to perform its own functionality.
  var scope, $compile, ctrl, $interval;

  beforeEach(module('AngularBlackBelt.communicationExamples'));
  beforeEach(module('AngularBlackBelt.fastClicker'));
  beforeEach(module('AngularBlackBelt.StopLight'));
  beforeEach(module('AngularBlackBelt.StopWatch'));
  beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_,_$interval_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $interval = _$interval_;
    $controller = _$controller_;
    scope.options = {
        lineWidth: 6,
        strokeStyle: '#003300',
        radius: 30,
        state: 'red',
        reverse: true
    };
    scope.stopwatch = {interval: 1000, log: []};
  }));

  describe('Creating A fastClicker directive inside a stopLight directive', function () {
    
    var stopLight,
        fastClicker;

    beforeEach(function(){
      stopLight = $compile('<div stop-light-container options="options">' +
                                 '<canvas stop-light></canvas>' +
                                 '<canvas stop-light></canvas>' +
                                 '<canvas stop-light></canvas>' +
                                 '<fast-clicker options="stopwatch" stopwatch></fast-clicker>' +
                               '</div>')(scope);
      scope.$apply();
      fastClicker = stopLight.find('fast-clicker');
      ctrl = $controller('stopLightCtrl', {$scope:  scope, $interval: $interval});
      scope.$apply();
    });  

    it('should activate its own button', function() {
        expect(fastClicker.children()[0].hasAttribute("disabled")).toBe(true);
        expect(ctrl.options.state).toBe('red');
        ctrl.setNextState();
        ctrl.setNextState();
        scope.$apply();
        expect(ctrl.options.state).toBe('green');
        expect(fastClicker.children()[0].hasAttribute("disabled")).toBe(false);
    });

    it('should allow for clicking the fast clicker and log the time', function() {
        expect(scope.stopwatch.log.length).toBe(0);
        ctrl.setNextState();
        ctrl.setNextState();
        scope.$apply();
        $(fastClicker.children()[0]).click();
        expect(scope.stopwatch.log.length).toBe(1);
    });
  });

  describe('Integration between the wasFast and fastRunner directives, which use the stopLight and stopWatch to get fed data', function () {
    
    var stopLight,
        logs,
        fastClicker;

    beforeEach(function(){
      stopLight = $compile('<div>' +
                            '<div stop-light-container options="options">' +
                               '<canvas stop-light></canvas>' +
                               '<canvas stop-light></canvas>' +
                               '<canvas stop-light></canvas>' +
                               '<fast-clicker options="stopwatch" stopwatch></fast-clicker>' +
                             '</div>'+
                             '<div class="logs" ng-repeat="log in stopwatch.log">'+
                              ' <div class="wasFast" was-fast time="log">' +
                            '</div>' +
                           '</div>')(scope);
      scope.$apply();
      fastClicker = stopLight.find('fast-clicker');
      ctrl = $controller('stopLightCtrl', {$scope:  scope, $interval: $interval});
      scope.$apply();
    });  

    it('should append a super fast child to the directive', function() {
        logs = stopLight.find('.logs');
        expect(logs.children().length).toBe(0);
        expect(scope.stopwatch.log.length).toBe(0);
        ctrl.setNextState();
        ctrl.setNextState();
        scope.$apply();
        $(fastClicker.children()[0]).click();
        logs = stopLight.find('.logs');
        expect(logs.children().length).toBe(1);
        expect($(logs.children()[0]).text().split('(')[1]).toBe('Super Dog Speed)');
        expect(stopLight.find('.wasFast').find('img').attr('src')).toBe('http://www.picgifs.com/dog-graphics/dog-graphics/hunting-dog/dog-graphics-hunting-dog-047205.GIF');
    });
  });

});
