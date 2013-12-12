describe('Stopwatch', function () {
  'use strict';

  var scope, ctrl, $compile, $locale, svgService, $window, $interval;

  beforeEach(module('AngularBlackBelt.Stopwatch'));
  
  beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_,_$interval_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $interval = _$interval_;
    scope.options = {
        interval: 100,
        log: []
    };
    scope.newObject = {};
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
        var stopwatch = $compile('<div stopwatch options="options"></div>')(scope);
        scope.$apply();
      }).not.toThrow();
    });

    it('Should set the default interval value to 100 milliseconds', function() {
      var stopwatch = $compile('<div stopwatch options="newObject"></div>')(scope);
      scope.$apply();
      expect(stopwatch.isolateScope().options.interval).toBe(100);
    }); 

    it('Should set the value of the options to 1000', function() {
      scope.newObject = {interval: 1000};
      var stopwatch = $compile('<div stopwatch options="newObject"></div>')(scope);
      scope.$apply();
      expect(stopwatch.isolateScope().options.interval).toBe(1000);
    }); 

  });

  describe('Creating A Stopwatch Directives DOM Elements and Interacting with them', function () {
     
     var stopwatch,
         stopwatchCtrl,
         stopwatchScope;

     beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_,_$interval_) {
      stopwatch = $compile('<div stopwatch options="options"></div>')(scope);
      scope.$apply();
      stopwatchCtrl = stopwatch.controller('stopwatch');
    }));

    it('Should create the correct elements based upon the given template for the stopwatch', function() {
      var domTime = $(stopwatch).find('.stopwatch');
      expect(domTime.html().trim()).toBe('0:0:0:0');
      expect($(stopwatch.children()[1]).html()).toBe('Start');
      expect($(stopwatch.children()[2]).html()).toBe('Stop');
      expect($(stopwatch.children()[3]).html()).toBe('Reset');
    }); 

    it('Should not call startTimer() when the DOM is loaded, but should start on click', function() {      
      expect(stopwatchCtrl.running).toBe(false);
      $(stopwatch.children()[1]).click();
      expect(stopwatchCtrl.running).toBe(true);
    }); 

    it('Should call stopTimer() when the Stop button is clicked', function() {
      $(stopwatch.children()[1]).click();
      expect(stopwatchCtrl.running).toBe(true);
      $(stopwatch.children()[2]).click();
      expect(stopwatchCtrl.running).toBe(false);
    }); 

    it('Should call stopTimer() when the Stop button is clicked and append the time to the directives defining scope', function() {
      $(stopwatch.children()[1]).click();
      $interval.flush(10000);
      expect(stopwatchCtrl.options.log.length).toBe(0);
      $(stopwatch.children()[2]).click();
      expect(stopwatchCtrl.running).toBe(false);
      expect(scope.options.log.length).toBe(1);
    }); 

     it('Should not append to the log if the timer is stoped and stop is clicked', function() {
      $(stopwatch.children()[1]).click();
      $interval.flush(10000);
      expect(stopwatchCtrl.options.log.length).toBe(0);
      $(stopwatch.children()[2]).click();
      expect(stopwatchCtrl.running).toBe(false);
      expect(scope.options.log.length).toBe(1);
      $(stopwatch.children()[2]).click();
      expect(scope.options.log.length).toBe(1);
      $(stopwatch.children()[1]).click();
      $(stopwatch.children()[2]).click();
      expect(scope.options.log.length).toBe(2);
    }); 

    it('Should reset the domTime back to 0:0:0:0 when reset is clicked', function() {
      var domTime = $(stopwatch).find('.stopwatch');
      $(stopwatch.children()[1]).click();
      expect(domTime.html().trim()).toBe('0:0:0:0');
      $interval.flush(10000);
      expect(domTime.html().trim()).toNotBe('0:0:0:0');
      $(stopwatch.children()[3]).click();
      expect(domTime.html().trim()).toBe('0:0:0:0');
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
      expect(ctrl.updateTime.callCount).toBe(10);
    }); 

    it('Should not call updateTime if the timer is stoped', function() {
      spyOn(ctrl , 'updateTime');
      ctrl.startTimer();
      $interval.flush(1000);
      expect(ctrl.updateTime.callCount).toBe(10);
      //calls update time one more time whevever we stop the timer.
      ctrl.stopTimer();
      $interval.flush(1000);
      expect(ctrl.updateTime.callCount).toBe(11);
    });

    it('Should not call updateTime if the scope has been destroyed', function() {
      spyOn(ctrl , 'updateTime');
      ctrl.startTimer();
      $interval.flush(1000);
      expect(ctrl.updateTime.callCount).toBe(10);
      scope.$destroy();
      $interval.flush(1000);
      expect(ctrl.updateTime.callCount).toBe(10);
    });

  });

});