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
        var stopwatch = $compile('<div stopwatch options="options"></div>')(scope);
        scope.$apply();
      }).not.toThrow();
    });

    it('Should set the default interval value to 100 milliseconds', function() {
      scope.newObject = {};
      var stopwatch = $compile('<div stopwatch options="newObject"></div>')(scope);
      scope.$apply();
      expect(stopwatch.scope().options.interval).toBe(100);
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
      stopwatchScope = stopwatch.scope();
    }));

    it('Should create the correct elements based upon the given template for the stopwatch', function() {
      var domTime = $(stopwatch).find('.stopwatch');
      expect(domTime.html().trim()).toBe('0:0:0:0');
      expect($(stopwatch.children()[1]).html()).toBe('Start');
      expect($(stopwatch.children()[2]).html()).toBe('Stop');
      expect($(stopwatch.children()[3]).html()).toBe('Reset');
    }); 

    it('Should call startTimer() and set running to true as soon as the stopwatch is created and linked to the DOM', function() {      
      expect(stopwatchCtrl.running).toBe(true);
    }); 

    it('Should call stopTimer() when the Stop button is clicked', function() {
      $(stopwatch.children()[2]).click();
      expect(stopwatchCtrl.running).toBe(false);
    }); 

    it('Should call stopTimer() when the Stop button is clicked and append to the directive options.log the time', function() {
      $interval.flush(10000);
      expect(stopwatchCtrl.options.log.length).toBe(0);
      $(stopwatch.children()[2]).click();
      expect(stopwatchCtrl.running).toBe(false);
      expect(stopwatchScope.options.log.length).toBe(1);
    }); 

     it('Should not append to the log if the timer is stoped and stop is clicked', function() {
      $interval.flush(10000);
      expect(stopwatchCtrl.options.log.length).toBe(0);
      $(stopwatch.children()[2]).click();
      expect(stopwatchCtrl.running).toBe(false);
      expect(stopwatchScope.options.log.length).toBe(1);
      $(stopwatch.children()[2]).click();
      expect(stopwatchScope.options.log.length).toBe(1);
      $(stopwatch.children()[1]).click();
      $(stopwatch.children()[2]).click();
      expect(stopwatchScope.options.log.length).toBe(2);
    }); 

    it('Should reset the domTime back to 0:0:0:0 when reset is clicked', function() {
      var domTime = $(stopwatch).find('.stopwatch');
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
      scope.$apply();
      expect(ctrl.updateTime.callCount).toBe(10);
    }); 

    it('Should not call updateTime if the timer is stoped', function() {
      spyOn(ctrl , 'updateTime');
      ctrl.stopTimer();
      $interval.flush(1000);
      expect(ctrl.updateTime.callCount).toBe(0);
    });

  });

});