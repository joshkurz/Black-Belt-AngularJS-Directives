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