describe('StopWatch', function () {
  'use strict';

  var scope, ctrl, $compile, $locale, svgService, $window, $interval;

  beforeEach(module('AngularBlackBelt.StopWatch'));
  
  beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_,_$interval_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $interval = _$interval_;
    scope.options = {
        interval: 100,
        log: []
    };
    scope.newObject = {};
  }));

  describe('Creating A Stopwatch Directive', function () {
    it('throw an error if there are no options set on the element', function() {
      expect(function(){
        var stopwatch = $compile('<div bb-stopwatch></div>')(scope);
        scope.$apply();
      }).toThrow('Must Pass an options object from the Controller For the Stopwatch to Work Correctly.');
    });   

    it('Should not throw an error with an empty options object', function() {
      expect(function(){
        scope.emptyObject = {};
        var stopwatch = $compile('<div bb-stopwatch options="emptyObject"></div>')(scope);
        scope.$apply();
      }).not.toThrow();
    });

    it('Should set the default interval value to 100 milliseconds', function() {
      var stopwatch = $compile('<div bb-stopwatch options="newObject"></div>')(scope);
      scope.$apply();
      expect(stopwatch.isolateScope().options.interval).toBe(100);
    }); 

    it('Should contain all relative functions', function() {
      var stopwatch = $compile('<div bb-stopwatch options="options"></div>')(scope);
      scope.$apply();
      expect(stopwatch.isolateScope().stopTimer).not.toBe(undefined);
      expect(stopwatch.isolateScope().startTimer).not.toBe(undefined);
      expect(stopwatch.isolateScope().resetTimer).not.toBe(undefined);
    }); 

  });

  describe('Creating A Stopwatch Directives DOM Elements and Interacting with them', function () {
     
     var stopwatch,
         stopwatchCtrl,
         stopwatchScope,
         container;

     beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_,_$interval_) {
      stopwatch = $compile('<div bb-stopwatch options="options" override="true">' +
              '<div class="container">' +
                '<div class="stopwatch numbers">' +
                  '{{options.elapsedTime | stopwatchTime}}' +
                 '</div>' +
                '<button class="btn" ng-click="startTimer()">Start</button>' +
                '<button class="btn" ng-click="stopTimer()">Stop</button>' +
                '<button class="btn" ng-click="resetTimer()">Reset</button>' +
              '</div>' +
          '</div>')(scope);
      scope.$apply();
      stopwatchCtrl = stopwatch.controller('bbStopwatch');
      container = $(stopwatch).find('.container');
    }));

    it('Should create the correct elements based upon the given template for the stopwatch', function() {
      var domTime = $(stopwatch).find('.stopwatch');
      expect(domTime.html().trim()).toBe('0:0:0:0');
      expect($(container.children()[1]).html()).toBe('Start');
      expect($(container.children()[2]).html()).toBe('Stop');
      expect($(container.children()[3]).html()).toBe('Reset');
    }); 

    it('Should not call startTimer() when the DOM is linked, but should start when the start button is clicked', function() {      
      expect(stopwatchCtrl.stopwatchService.running).toBe(false);
      $(container.children()[1]).click();
      expect(stopwatchCtrl.stopwatchService.running).toBe(true);
    }); 

    it('Should call stopTimer() when the Stop button is clicked', function() {
      $(container.children()[1]).click();
      expect(stopwatchCtrl.stopwatchService.running).toBe(true);
      $(container.children()[2]).click();
      expect(stopwatchCtrl.stopwatchService.running).toBe(false);
    }); 

    it('Should call stopTimer() when the Stop button is clicked and append the time to the directives defining scope', function() {
      $(container.children()[1]).click();
      $interval.flush(10000);
      expect(scope.options.log.length).toBe(0);
      $(container.children()[2]).click();
      expect(stopwatchCtrl.stopwatchService.running).toBe(false);
      expect(scope.options.log.length).toBe(1);
    }); 

     it('Should not append to the log if the timer is stoped and stop is clicked', function() {
      $(container.children()[1]).click();
      $interval.flush(10000);
      expect(scope.options.log.length).toBe(0);
      $(container.children()[2]).click();
      expect(stopwatchCtrl.stopwatchService.running).toBe(false);
      expect(scope.options.log.length).toBe(1);
      $(container.children()[2]).click();
      expect(scope.options.log.length).toBe(1);
      $(container.children()[1]).click();
      $(container.children()[2]).click();
      expect(scope.options.log.length).toBe(2);
    }); 

    it('Should reset the domTime back to 0:0:0:0 when reset is clicked', function() {
      var domTime = $(container).find('.stopwatch');
      $(container.children()[1]).click();
      expect(domTime.html().trim()).toBe('0:0:0:0');
      $interval.flush(10000);
      expect(domTime.html().trim()).toNotBe('0:0:0:0');
      $(container.children()[3]).click();
      expect(domTime.html().trim()).toBe('0:0:0:0');
    }); 

  });

  describe('Creating A Stopwatch Directive with a different transcluded template', function () {
     
     var stopwatch,
         stopwatchCtrl,
         stopwatchScope,
         container;

     beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_,_$interval_) {
      stopwatch = $compile('<div bb-stopwatch options="options" override="true">' +
              '<div class="container">' +
                '<div class="stopwatch numbers">' +
                  '{{options.elapsedTime | stopwatchTime}}' +
                 '</div>' +
                '<button class="btn" ng-click="resetTimer()">Reset</button>' +
                '<button class="btn" ng-click="stopTimer()">Stop</button>' +
                '<button class="btn" ng-click="startTimer()">Start</button>' +
              '</div>' +
          '</div>')(scope);
      scope.$apply();
      stopwatchCtrl = stopwatch.controller('bbStopwatch');
      container = stopwatch.find('.container');
    }));

    it('Should create the correct elements based upon the given template for the stopwatch', function() {
      var domTime = $(stopwatch).find('.stopwatch');
      expect(domTime.html().trim()).toBe('0:0:0:0');
      expect($(container.children()[3]).html()).toBe('Start');
      expect($(container.children()[2]).html()).toBe('Stop');
      expect($(container.children()[1]).html()).toBe('Reset');
    }); 

    it('Should not call startTimer() when the DOM is linked, but should start when the start button is clicked', function() {      
      expect(stopwatchCtrl.stopwatchService.running).toBe(false);
      $(container.children()[3]).click();
      expect(stopwatchCtrl.stopwatchService.running).toBe(true);
    }); 

    it('Should call stopTimer() when the Stop button is clicked', function() {
      $(container.children()[3]).click();
      expect(stopwatchCtrl.stopwatchService.running).toBe(true);
      $(container.children()[2]).click();
      expect(stopwatchCtrl.stopwatchService.running).toBe(false);
    }); 

    it('Should call stopTimer() when the Stop button is clicked and append the time to the directives defining scope', function() {
      $(container.children()[3]).click();
      $interval.flush(10000);
      expect(scope.options.log.length).toBe(0);
      $(container.children()[2]).click();
      expect(stopwatchCtrl.stopwatchService.running).toBe(false);
      expect(scope.options.log.length).toBe(1);
    }); 

     it('Should not append to the log if the timer is stoped and stop is clicked', function() {
      $(container.children()[3]).click();
      $interval.flush(10000);
      expect(scope.options.log.length).toBe(0);
      $(container.children()[2]).click();
      expect(stopwatchCtrl.stopwatchService.running).toBe(false);
      expect(scope.options.log.length).toBe(1);
      $(container.children()[2]).click();
      expect(scope.options.log.length).toBe(1);
      $(container.children()[3]).click();
      $(container.children()[2]).click();
      expect(scope.options.log.length).toBe(2);
    }); 

    it('Should reset the domTime back to 0:0:0:0 when reset is clicked', function() {
      var domTime = $(stopwatch).find('.stopwatch');
      $(container.children()[3]).click();
      expect(domTime.html().trim()).toBe('0:0:0:0');
      $interval.flush(10000);
      expect(domTime.html().trim()).toNotBe('0:0:0:0');
      $(container.children()[1]).click();
      expect(domTime.html().trim()).toBe('0:0:0:0');
    }); 

  });

  describe('Stopwatch Factory Function', function () {
   
    var stopwatchService;

    beforeEach(inject(function (_$rootScope_,_$interval_,StopwatchFactory) {
      scope = _$rootScope_.$new();
      $interval = _$interval_;
      scope.options = {
          interval: 100,
          log: []
      };
      stopwatchService = new StopwatchFactory(scope.options);
    }));


    it('Should call updateTime when the timer is started and should call it every 100 milliseconds', function() {
      spyOn(stopwatchService, 'updateTime');
      jasmine.Clock.useMock();
      stopwatchService.startTimer();
      $interval.flush(1000);
      expect(stopwatchService.updateTime.callCount).toBe(10);
      $interval.flush(1000);
      expect(stopwatchService.updateTime.callCount).toBe(20);
      $interval.flush(1000);
      expect(stopwatchService.updateTime.callCount).toBe(30);
    }); 

    it('Should not call updateTime if the timer is stopped', function() {
      spyOn(stopwatchService , 'updateTime');
      stopwatchService.startTimer();
      $interval.flush(1000);
      expect(stopwatchService.updateTime.callCount).toBe(10);
      //calls update time one more time whenvever we stop the timer so the elapsedTime has the most up to date time.
      stopwatchService.stopTimer();
      $interval.flush(1000);
      expect(stopwatchService.updateTime.callCount).toBe(11);
    });

    it('Should append to the options log object', function() {
      spyOn(stopwatchService , 'updateTime');
      stopwatchService.startTimer();
      $interval.flush(1000);
      //calls update time one more time whenvever we stop the timer so the elapsedTime has the most up to date time.
      stopwatchService.stopTimer();
      expect(scope.options.log.length).toBe(1);
    });

    it('Should not call updateTime if the interval has been destroyed', function() {
      spyOn(stopwatchService , 'updateTime');
      stopwatchService.startTimer();
      $interval.flush(1000);
      expect(stopwatchService.updateTime.callCount).toBe(10);
      stopwatchService.cancelTimer();
      $interval.flush(1000);
      expect(stopwatchService.updateTime.callCount).toBe(10);
    });

  });

  describe('Creating multiple stopwatches on a single scope and making sure they do not interfere with each other', function () {
     
     var stopwatch,
         stopwatch2,
         stopwatch3,
         stopwatchCtrl,
         stopwatchCtrl2,
         stopwatchCtrl3,
         stopwatchScope,
         container,
         container2,
         container3;

     beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_,_$interval_) {
      scope.options2 = {
          interval: 1000,
          log: []
      };
      scope.options3 = {
          interval: 200,
          log: []
      };
      stopwatch = $compile('<div bb-stopwatch options="options" override="true">' +
              '<div class="container">' +
                '<div class="stopwatch numbers">' +
                  '{{options.elapsedTime | stopwatchTime}}' +
                 '</div>' +
                '<button class="btn" ng-click="startTimer()">Start</button>' +
                '<button class="btn" ng-click="stopTimer()">Stop</button>' +
                '<button class="btn" ng-click="resetTimer()">Reset</button>' +
              '</div>' +
          '</div>')(scope);
      stopwatch2 = $compile('<div bb-stopwatch options="options2" override="true">' +
              '<div class="container">' +
                '<div class="stopwatch numbers">' +
                  '{{options.elapsedTime | stopwatchTime}}' +
                 '</div>' +
                 '<button class="btn" ng-click="resetTimer()">Reset</button>' +
                 '<button class="btn" ng-click="stopTimer()">Stop</button>' +
                 '<button class="btn" ng-click="startTimer()">Start</button>' +
              '</div>' +
          '</div>')(scope);
      stopwatch3 = $compile('<div bb-stopwatch options="options3" override="true">' +
              '<div class="container">' +
                '<div class="stopwatch numbers">' +
                  '{{options.elapsedTime | stopwatchTime}}' +
                 '</div>' +
                '<button class="btn" ng-click="startTimer()">Start</button>' +
                '<button class="btn" ng-click="stopTimer()">Stop</button>' +
                '<button class="btn" ng-click="resetTimer()">Reset</button>' +
              '</div>' +
          '</div>')(scope);
      scope.$apply();
      container = stopwatch.find('.container');
      container2 = stopwatch2.find('.container');
      container3 = stopwatch3.find('.container');
      stopwatchCtrl = stopwatch.controller('bbStopwatch');
      stopwatchCtrl2 = stopwatch2.controller('bbStopwatch');
      stopwatchCtrl3 = stopwatch3.controller('bbStopwatch');
    }));

     it('All of the stopwatches should append to their own log array', function() {
      $(container.children()[1]).click();
      $(container2.children()[3]).click();
      $(container3.children()[1]).click();
      $interval.flush(10000);
      expect(scope.options.log.length).toBe(0);
      expect(scope.options2.log.length).toBe(0);
      expect(scope.options3.log.length).toBe(0);
      $(container.children()[2]).click();
      $(container2.children()[2]).click();
      $(container3.children()[2]).click();
      expect(stopwatchCtrl.stopwatchService.running).toBe(false);
      expect(stopwatchCtrl2.stopwatchService.running).toBe(false);
      expect(stopwatchCtrl3.stopwatchService.running).toBe(false);
      expect(scope.options.log.length).toBe(1);
      expect(scope.options2.log.length).toBe(1);
      expect(scope.options3.log.length).toBe(1);
    }); 

     it('Only going to run one timer and the other should stay at zero', function() {
      var domTime = $(stopwatch).find('.stopwatch');
      var domTime2 = $(stopwatch2).find('.stopwatch');
      var domTime3 = $(stopwatch3).find('.stopwatch');
      $(container.children()[1]).click();
      expect(domTime.html().trim()).toBe('0:0:0:0');
      expect(domTime2.html().trim()).toBe('0:0:0:0');
      expect(domTime3.html().trim()).toBe('0:0:0:0');
      $interval.flush(10000);
      expect(domTime.html().trim()).toNotBe('0:0:0:0');
      expect(domTime2.html().trim()).toBe('0:0:0:0');
      expect(domTime3.html().trim()).toBe('0:0:0:0');
      $(container.children()[3]).click();
      expect(domTime.html().trim()).toBe('0:0:0:0');
      expect(domTime2.html().trim()).toBe('0:0:0:0');
      expect(domTime3.html().trim()).toBe('0:0:0:0');
    }); 

  });

 describe('Stopwatch Filter', function () {

    var stopwatchTimeFilter = null;

    beforeEach(inject(function ($filter) {
      stopwatchTimeFilter = $filter('stopwatchTime');
    }));

    it('Should filter the date object to be in stopwatch format with all zeros', function() {
      var newDate = new Date(0);
      expect(stopwatchTimeFilter(newDate)).toBe('0:0:0:0');
    }); 

    it('Should have 1 second elapsed', function() {
      var newDate = new Date(1000);
      expect(stopwatchTimeFilter(newDate)).toBe('0:0:1:0');
    }); 

    it('Should have 1 minute elapsed', function() {
      var newDate = new Date(1000 * 60);
      expect(stopwatchTimeFilter(newDate)).toBe('0:1:0:0');
    }); 

    it('Should have 1 hour elapsed', function() {
      var newDate = new Date(1000 * 60 * 60);
      expect(stopwatchTimeFilter(newDate)).toBe('1:0:0:0');
    }); 

  });

});