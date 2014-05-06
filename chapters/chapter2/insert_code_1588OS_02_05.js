it('Should set the default interval value to 100 milliseconds', function() {
  var stopwatch = $compile('<div bb-stopwatch options="newObject"></div>')(scope);
  scope.$apply();
  expect(stopwatch.scope().options.interval).toBe(100);
});