it('should throw an error if not set on a canvas element',function(){
  expect(function(){
    var gauge = $compile('<div gauge-js></div>')(scope);
  }).toThrow('guage-js can only be set on a canvas element. DIV will not work.');
});

it('should not throw an error when creating on a canvas element', function() {
  expect(function(){
    var gauge = $compile('<canvas gauge-js current-value="value"
    options="configOptions"></canvas>')(scope);
  }).not.toThrow();
});