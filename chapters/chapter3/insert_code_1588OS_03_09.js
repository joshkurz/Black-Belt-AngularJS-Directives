beforeEach(function(){
  spyOn($.fn, 'fullCalendar');
  $compile('<div ui-calendar="uiConfig.calendar"
  ng-model="eventSources"></div>')(scope);
  scope.$apply();
});