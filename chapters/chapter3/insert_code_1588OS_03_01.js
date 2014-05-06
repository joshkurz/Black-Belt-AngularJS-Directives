it('should make sure the thirdPartyFunction is called, function (){
  spyOn($.fn, 'thirdPartyFunction');
  expect($.fn.thirdPartyFunction.callCount).toBe(0);
  $compile('<div sample-directive></div>')(scope);
  expect($.fn.thirdPartyFunction.callCount).toBe(1);
});