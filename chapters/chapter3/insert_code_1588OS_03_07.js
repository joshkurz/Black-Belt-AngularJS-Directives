it('should make sure that if we just change the title of the event that it updates itself',function () {
  var calendarCalls = $.fn.fullCalendar.mostRecentCall.args[0].eventSources;
  scope.events[0].title = 'change title';
  scope.$apply();
  calendarCalls = $.fn.fullCalendar.mostRecentCall.args[0];
  expect(calendarCalls).toEqual('updateEvent');
});