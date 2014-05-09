describe('The wasFast directive', function () {
  var wasFast;
  function compileWasFast(){
    wasFast = $compile('<div was-fast time="testLog"></div>')(scope);
    scope.$apply();
  }

  it('should append the correct super fast text and the fast class to the directive', function() {
        scope.testLog = 100;
        compileWasFast();
        expect(wasFast.text()).toBe('0.1 seconds (Super Dog Speed)');
        expect(wasFast.children().eq(0).hasClass('fast')).toBe(true);
  });
});