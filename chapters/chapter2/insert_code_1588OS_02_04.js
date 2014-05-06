it('Should not throw an error with an options object', function(){
  expect(function(){
    scope.optionsObject = {};
    var stopwatch = $compile('<div bb-stopwatch options="optionsObject"></div>')(scope);
    scope.$apply();
  }).not.toThrow();
});