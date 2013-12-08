describe('Stopwatch', function () {
  'use strict';

  var scope, ctrl, $compile, $locale, svgService, $window, $interval;

  beforeEach(module('Stopwatch'));
  beforeEach(module('directives/Stopwatch/stopwatch.tpl.html', 'directives/Stopwatch/stopwatch.tpl.html'));
  
  beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_,_$interval_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $interval = _$interval_;
    scope.options = {
        interval: 100,
        log: []
    };
    scope.$apply();
  }));

  describe('Creating A Stopwatch Directive', function () {
    it('throw an error if there are no options set on the element', function() {
      expect(function(){
        var stopwatch = $compile('<div stopwatch></div>')(scope);
        scope.$apply();
      }).toThrow('Must Pass an options object from the Controller For the Stopwatch to Work Correctly.');
    });    

    it('Should not throw an error with an empty options object', function() {
      expect(function(){
        scope.newObject = {};
        var stopwatch = $compile('<div stopwatch options="newObject"></div>')(scope);
        scope.$apply();
      }).not.toThrow();
    });

  });

  describe('Stopwatch Directives Controller', function () {

    beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_,_$interval_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $interval = _$interval_;
    scope.options = {
        interval: 100,
        log: []
    };
    ctrl = _$controller_('stopwatchCtrl', {$scope:  scope, $interval: $interval});
    scope.$apply();
  }));

    it('Should call updateTime when the timer is started and should call it every 100 milliseconds', function() {
      spyOn(ctrl, 'updateTime');
      ctrl.startTimer();
      $interval.flush(1000);
      scope.$apply();
      expect(ctrl.updateTime.callCount).toBe(10);
    }); 

    it('Should call cancel the contollers timer if stopTimer is called', function() {
      spyOn(ctrl , 'updateTime');
      ctrl.stopTimer();
      $interval.flush(1000);
      expect(ctrl.updateTime.callCount).toBe(0);
    });

  });

});