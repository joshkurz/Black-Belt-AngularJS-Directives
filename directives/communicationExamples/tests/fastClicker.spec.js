describe('fastClicker', function () {
  
  //These are unit and integration tests. This directive relies on the stopwatch and stopLight directives to be able to perform its own functionality.
  var scope, $compile, ctrl, $interval;

  beforeEach(module('AngularBlackBelt.communicationExamples', 'directives/communicationExamples/fastClicker.tpl.html'));
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
    scope.testPics = {
                      100: 'http://www.picgifs.com/dog-graphics/dog-graphics/hunting-dog/dog-graphics-hunting-dog-047205.GIF',
                      10:  'http://www.picgifs.com/sport-graphics/sport-graphics/running/sport-graphics-running-371709.gif',
                      1 :  'http://www.picgifs.com/sport-graphics/sport-graphics/running/sport-graphics-running-510249.gif'
                     };
  }));

  describe('Creating A fastClicker directive inside a stopLight directive', function () {
      
      var stopLight,
          fastClicker;

      beforeEach(function(){
        var integration = angular.element('<div stop-light-container options="options">' +
                                   '<canvas stop-light></canvas>' +
                                   '<canvas stop-light></canvas>' +
                                   '<canvas stop-light></canvas>' +
                               '<fast-clicker></fast-clicker>' +
                                 '</div>');
        stopLight = $compile(integration)(scope);
        scope.$apply();
        fastClicker = stopLight.find('fast-clicker');
        ctrl = $controller('stopLightCtrl', {$scope:  scope, $interval: $interval
      });
        scope.$apply();
      });  
      it('should activate its own button', function() {
          var fastClickerChild = fastClicker.children()[0];           
          expect(fastClickerChild.hasAttribute("disabled")).toBe(true);
          expect(ctrl.options.state).toBe('red');
          ctrl.setNextState();
          ctrl.setNextState();
          scope.$apply();
          expect(ctrl.options.state).toBe('green');     
          expect(fastClickerChild.hasAttribute("disabled")).toBe(false);
      });
  });

  describe('Creating A fastClicker directive inside a stopLight directive', function () {
    
    var stopLight,
        fastClicker;

    beforeEach(function(){
      var integration = angular.element('<div stop-light-container options="options">' +
                                 '<canvas stop-light></canvas>' +
                                 '<canvas stop-light></canvas>' +
                                 '<canvas stop-light></canvas>' +
                                 '<fast-clicker options="stopwatch" bb-stopwatch></fast-clicker>' +
                               '</div>');
      stopLight = $compile(integration)(scope);
      scope.$apply();
      fastClicker = stopLight.find('fast-clicker');
      ctrl = $controller('stopLightCtrl', {$scope:  scope, $interval: $interval});
      scope.$apply();
    });  

    it('should activate its own button', function() {
        var fastClickerChild = fastClicker.children()[0];
        expect(fastClickerChild.hasAttribute("disabled")).toBe(true);
        expect(ctrl.options.state).toBe('red');
        ctrl.setNextState();
        ctrl.setNextState();
        scope.$apply();
        expect(ctrl.options.state).toBe('green');
        expect(fastClickerChild.hasAttribute("disabled")).toBe(false);
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
      var integration = '<div>' +
                            '<div stop-light-container options="options">' +
                               '<canvas stop-light></canvas>' +
                               '<canvas stop-light></canvas>' +
                               '<canvas stop-light></canvas>' +
                               '<fast-clicker options="stopwatch" bb-stopwatch></fast-clicker>' +
                             '</div>'+
                             '<div class="logs" ng-repeat="log in stopwatch.log">'+
                              ' <div class="wasFast" was-fast time="log"></div>' +
                              ' <div class="fastRunner" fast-runner time="log" pics="testPics"></div>' +
                            '</div>' +
                           '</div>';

      stopLight = $compile(integration)(scope);
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
        expect(logs.children().eq(0).text().split('(')[1]).toBe('Super Dog Speed)');
        expect(logs.children().eq(1).find('img').attr('src')).toBe('http://www.picgifs.com/dog-graphics/dog-graphics/hunting-dog/dog-graphics-hunting-dog-047205.GIF');
    });
  });


  describe('The wasFast directive', function () {
    
    var wasFast;

    function compileWasFast(){
      wasFast = $compile('<div was-fast time="testLog"></div>')(scope);
      scope.$apply();
    }  

    it('should append the correct super fast text and the fast class to the directive', function() {
        scope.testLog = 100;
        compileWasFast();
        expect(wasFast.text()).toBe('0.1 seconds (Super Dog Speed)');
        expect(wasFast.children().eq(0).hasClass('fast')).toBe(true);
    });

    it('should append the correct text and the average class to the directive', function() {
        scope.testLog = 2000;
        compileWasFast();
        expect(wasFast.text()).toBe('2 seconds (Human Speed)');
        expect(wasFast.children().eq(0).hasClass('average')).toBe(true);
    });

    it('should append the correct text and the slow class to the directive', function() {
        scope.testLog = 6000;
        compileWasFast();
        expect(wasFast.text()).toBe('6 seconds (Super Slow Speed)');
        expect(wasFast.children().eq(0).hasClass('slow')).toBe(true);
    });
  });

describe('Integration between the stopwatch and the wasFast directive', function () {
    
    var integration,
        logs,
        stopwatch;

    beforeEach(function(){
      var preCompileElement = angular.element('<div>' +
                               '<div class="stopwatch" options="stopwatch" bb-stopwatch override="true">' +
                                 '<button ng-click="startTimer()">start</button>'+
                                 '<button ng-click="stopTimer()">stop</button>'+
                              '</div>' +
                               '<div class="logs" ng-repeat="log in stopwatch.log">'+
                                 ' <div class="wasFast" was-fast time="log"></div>' +
                                 ' <div class="fastRunner" fast-runner time="log" pics="testPics"></div>' +
                               '</div>' +
                             '</div>');

      integration = $compile(preCompileElement)(scope);
      scope.$apply();
      stopwatch = integration.find('.stopwatch');
    });  

    it('should append a super fast child to the directive', function() {
        logs = integration.find('.logs');
        expect(logs.children().length).toBe(0);
        expect(scope.stopwatch.log.length).toBe(0);
        $(stopwatch.children()[0]).click();
        $(stopwatch.children()[1]).click();
        logs = integration.find('.logs');
        expect(scope.stopwatch.log.length).toBe(1);
        expect(logs.children().eq(0).text().split('(')[1]).toBe('Super Dog Speed)');
        expect(integration.find('marquee').attr('scrollamount')).toBe('100');
        expect(integration.find('img').attr('src')).toBe('http://www.picgifs.com/dog-graphics/dog-graphics/hunting-dog/dog-graphics-hunting-dog-047205.GIF');
    });
  });

});
