it('should set the Gauge when the directive is compiled and linked to the DOM', function() {
  spyOn(Gauge.prototype, 'setOptions').andCallThrough();
  var gauge = $compile('<canvas gauge-js current-value="value"
  options="configOptions"></canvas>')(scope);
  scope.$apply();
  expect(Gauge.prototype.setOptions)
    toHaveBeenCalledWith(scope.configOptions);
  });
});