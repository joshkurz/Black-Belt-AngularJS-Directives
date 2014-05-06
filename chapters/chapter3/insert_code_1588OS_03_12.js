scope.calEventsExt = {
  color: '#f00',
  textColor: 'yellow',
  events: [ //eventObjects ]
};
it('should make sure the calendar can work with extended event sources', function () {
  scope.eventSources.push(scope.calEventsExt);
  scope.$apply();
  var fullCalendarParam = $.fn.fullCalendar;
  mostRecentCall.args[0];
  expect(fullCalendarParam).toEqual('rerenderEvents');
});