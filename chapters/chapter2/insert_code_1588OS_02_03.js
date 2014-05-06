it('should throw an error if there are no options set on the element', function() {
  expect(function(){
    var stopwatch = $compile('<div bb-stopwatch></div>')(scope);
    scope.$apply();
  }).toThrow('Must pass an options object for the stopwatch to work correctly.');
});