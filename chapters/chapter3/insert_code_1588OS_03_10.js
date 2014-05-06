it('should set up the calendar with the correct options and events', function () {
  expect($.fn.fullCalendar.mostRecentCall.args[0].eventSources[0].length).toBe(4);
  expect($.fn.fullCalendar.mostRecentCall.args[0]
  eventSources[0][0]title).toBe('All Day Event');
  expect($.fn.fullCalendar.mostRecentCall.args[0]
  eventSources[0][0].url).toBe('http://www.angularjs.org');
});