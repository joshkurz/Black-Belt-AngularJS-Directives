it('Should call updateTime when the timer is started and should call it every 100 milliseconds', function() {
  spyOn(stopwatchService, 'updateTime');
  jasmine.Clock.useMock();
  stopwatchService.startTimer();
  $interval.flush(1000);
  expect(stopwatchService.updateTime.callCount).toBe(10);
  $interval.flush(1000);
  expect(stopwatchService.updateTime.callCount).toBe(20);
  $interval.flush(1000);
  expect(stopwatchService.updateTime.callCount).toBe(30);
});