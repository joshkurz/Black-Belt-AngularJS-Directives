beforeEach(inject(function(_$rootScope_,_$interval_,StopwatchFactory) {
  scope = _$rootScope_.$new();
  $interval = _$interval_;
  scope.options = {
    interval: 100,
    log: []
  };
  stopwatchService = new StopwatchFactory(scope.options);
}));