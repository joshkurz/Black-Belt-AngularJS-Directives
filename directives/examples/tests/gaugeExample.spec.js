describe('gauge-js', function () {
  'use strict';

  var scope, $compile;

  beforeEach(module('AngularBlackBelt.examples'));
  
  beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_,_$interval_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;

    scope.configOptions = {
        lineWidth: 1,
        maxValue: 100
    };

    scope.badConfigOptions = {};

    scope.value = 25;

  }));

  describe('Creating A gauge-js Directive', function () {

    it('should throw an error if not set on a canvas element', function() {
      expect(function(){
        var gauge = $compile('<div gauge-js></div>')(scope);
      }).toThrow('guage-js can only be set on a canvas element. DIV will not work.');
    });   

    it('should not throw an error when creating on a canvas element', function() {
      expect(function(){
        var gauge = $compile('<canvas gauge-js ng-module="value" options="configOptions"></canvas>')(scope);
      }).not.toThrow();
    });  

    it('should set the Gauge when the directive is compiled and linked to the DOM', function() {
      spyOn(Gauge.prototype, 'setOptions').andCallThrough();
      var gauge = $compile('<canvas gauge-js ng-module="value" options="configOptions"></canvas>')(scope);
      scope.$apply();
      expect(Gauge.prototype.setOptions).toHaveBeenCalledWith(scope.configOptions);
    }); 

  });

  describe('Testing the Scope of a Gauge Directive', function () {
    
    var gauge,
        gaugeScope;
    beforeEach(function(){
      gauge = $compile('<canvas gauge-js ng-module="value" options="configOptions"></canvas>')(scope);
      gaugeScope = gauge.isolateScope();
    });

    it('make sure the isolateScope has the correct values attached', function() {
      expect(gaugeScope.currentValue).toBe(25);
      expect(gaugeScope.options).toBe(scope.configOptions);
    });   

    it('when the currentValue changes the gauge is updated correctly', function() {
      var oldDataUrl = gauge[0].toDataURL();
      scope.value = 100;
      scope.$apply();
      expect(gauge[0].toDataURL()).not.toBe(oldDataUrl);
    });   

    it('when the options change the gauge updates itself', function() {
      var oldDataUrl = gauge[0].toDataURL();
      scope.configOptions = 1000;
      scope.$apply();
      expect(gauge[0].toDataURL()).not.toBe(oldDataUrl);
    });    

  });

});