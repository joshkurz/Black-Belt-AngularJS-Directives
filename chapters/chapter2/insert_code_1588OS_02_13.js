it('Should not call updateTime if the interval has been destroyed', function() {
  spyOn(stopwatchService , 'updateTime');
  stopwatchService.startTimer();
  $interval.flush(1000);
  expect(stopwatchService.updateTime.callCount).toBe(10);
  stopwatchService.cancelTimer();
  $interval.flush(1000);
  expect(stopwatchService.updateTime.callCount).toBe(10);
});