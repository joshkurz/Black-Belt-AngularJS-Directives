it('Should contain all relative functions', function() {
  var stopwatch = $compile('<div bb-stopwatch options="options"></div>')(scope);
  scope.$apply();
  expect(stopwatch.scope().stopTimer).not.toBe(undefined);
  expect(stopwatch.scope().startTimer).not.toBe(undefined);
  expect(stopwatch.scope().resetTimer).not.toBe(undefined);
});