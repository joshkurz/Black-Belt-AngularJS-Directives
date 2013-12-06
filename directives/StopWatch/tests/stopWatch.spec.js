describe('StopWatch', function () {
  'use strict';

  var scope, $compile, $locale, ctrl, svgService;

  beforeEach(module('StopWatch'));
  beforeEach(module('directives/StopWatch/stopWatch.tpl.html', 'directives/StopWatch/stopWatch.tpl.html'));
  beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_,_$interval_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
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
        var stopLight = $compile('<div stop-watch></div>')(scope);
        scope.$apply();
      }).toThrow('Must Pass an options object from the Controller For the StopWatch to Work Correctly.');
    });    
  });

});