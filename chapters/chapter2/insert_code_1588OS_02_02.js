beforeEach(module('AngularBlackBelt.Stopwatch'));
beforeEach(inject(function (_$rootScope_, _$compile_,_$interval_) {
  scope = _$rootScope_.$new();
  $compile = _$compile_;
  $interval = _$interval_;
  scope.options = {
    interval: 100,
    log: []
  };
}));