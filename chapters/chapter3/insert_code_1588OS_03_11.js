it('should call its renderEvent method', function () {
  expect($.fn.fullCalendar.mostRecentCall.args[0].eventSources[0].length).toEqual(4);
  expect($.fn.fullCalendar.callCount).toEqual(1);
  scope.addChild(scope.events);
  scope.$apply();
  expect($.fn.fullCalendar.callCount).toEqual(2);
  expect($.fn.fullCalendar.mostRecentCall.args[0])
  toEqual('renderEvent');
  scope.addChild(scope.events);
  scope.$apply();
  expect($.fn.fullCalendar.callCount).toEqual(3);
  expect($.fn.fullCalendar.mostRecentCall.args[0])
  toEqual('renderEvent');
});