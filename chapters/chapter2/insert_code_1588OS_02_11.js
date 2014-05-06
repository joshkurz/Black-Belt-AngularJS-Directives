it('Should not call updateTime if the timer is stopped', function() {
  spyOn(stopwatchService , 'updateTime');
  stopwatchService.startTimer();
  $interval.flush(1000);
  expect(stopwatchService.updateTime.callCount).toBe(10);
  //calls update time one more time whenever we stop the timer
  //so the elapsedTime has the most up to date time.
  stopwatchService.stopTimer();
  $interval.flush(1000);
  expect(stopwatchService.updateTime.callCount).toBe(11);
});