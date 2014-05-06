app.directive('bbStopwatch', ['StopwatchFactory',
  function(StopwatchFactory){
    return {
      restrict: 'EA',
      scope: true,
      link: function(scope, elem, attrs){
      if (!attrs.options){
        throw new Error('Must Pass an options object from the Controller For the Stopwatch to Work Correctly.');
      }
      var stopwatchService = new StopwatchFactory(scope[attrs.options]);
      scope.startTimer = stopwatchService.startTimer;
      scope.stopTimer = stopwatchService.stopTimer;
      scope.resetTimer = stopwatchService.resetTimer;
    }
  };
}]);