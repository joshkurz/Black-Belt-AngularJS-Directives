it('Should append to the options log object', function() {
  spyOn(stopwatchService , 'updateTime');
  stopwatchService.startTimer();
  $interval.flush(1000);
  //calls update time one more time whenever we stop the timer so
  //the elapsedTime has the most up to date time.
  stopwatchService.stopTimer();
  expect(scope.options.log.length).toBe(1);
});