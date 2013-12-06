describe('StopWatch', function () {
  'use strict';

  var scope, $compile, $locale, ctrl, svgService, $window, $interval;

  beforeEach(module('StopWatch'));
  beforeEach(module('directives/StopWatch/stopWatch.tpl.html', 'directives/StopWatch/stopWatch.tpl.html'));
  beforeEach(module(function ($provide) {
    var repeatFns = [],
        nextRepeatId = 0,
        now = 0;

    $window = {
      setInterval: function(fn, delay, count) {
        repeatFns.push({
          nextTime:(now + delay),
          delay: delay,
          fn: fn,
          id: nextRepeatId
        });
        repeatFns.sort(function(a,b){ return a.nextTime - b.nextTime;});

        return nextRepeatId++;
      },

      clearInterval: function(id) {
        var fnIndex;

        angular.forEach(repeatFns, function(fn, index) {
          if (fn.id === id) {
            fnIndex = index;
          }
        });

        if (fnIndex !== undefined) {
          repeatFns.splice(fnIndex, 1);
          return true;
        }

        return false;
      },

      flush: function(millis) {
        now += millis;

        function flushSort(a,b){ return a.nextTime - b.nextTime;}
        while (repeatFns.length && repeatFns[0].nextTime <= now) {
          var task = repeatFns[0];
          task.fn();
          task.nextTime += task.delay;
          repeatFns.sort(flushSort);
        }
        return millis;
      }
    };
    
    $provide.value('$window', $window);

  }));
  beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_,_$interval_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $interval = _$interval_;
    scope.options = {
        interval: 100,
        log: []
    };
    ctrl = _$controller_('stopWatchCtrl', {$scope:  scope, $interval: _$interval_});
    scope.$apply();
  }));

  describe('Creating A Stop Watch Directive', function () {
    it('throw an error if there are no options set on the element', function() {
      expect(function(){
        var stopWatch = $compile('<div stop-watch></div>')(scope);
        scope.$apply();
      }).toThrow('Must Pass an options object from the Controller For the StopWatch to Work Correctly.');
    });    

    it('Should not throw an error with an empty options object', function() {
      expect(function(){
        scope.newObject = {};
        var stopWatch = $compile('<div stop-watch options="newObject"></div>')(scope);
        scope.$apply();
      }).not.toThrow();
    }); 

    it('Should set an interval of 100 on the new object and also set a date.', function() {
      scope.newObject = {};
      var stopWatch = $compile('<div stop-watch options="newObject"></div>')(scope);
      scope.$apply();
      expect(scope.newObject.interval).toBe(100);
      expect(scope.newObject.elapsedTime.getTime()).toBe(0);
    }); 
    
    it('Should update the elapsedTime every 100 milliseconds', function() {
      scope.newObject = {};
      var stopWatch = $compile('<div stop-watch options="newObject"></div>')(scope);
      spyOn(ctrl, 'startTimer');
      expect(ctrl.startTimer).toHaveBeenCalled();
    }); 

    it('Should update the elapsedTime every 100 milliseconds', function() {
      scope.newObject = {};
      var stopWatch = $compile('<div stop-watch options="newObject"></div>')(scope);
      scope.$apply();
      stopWatch.scope().updateTime();
      for(var i = 0;i < 100;i++){
        expect(scope.newObject.elapsedTime.getTime()).toBe(100*i);
      }
    }); 

  });

});