// The container for the stopLight's
angular.module('TrafficLight')
.directive('bbStopLightContainer', [ function() {
  return {
    controller: 'bbStopLightCtrl',
    scope: {options: '='}
  };
}])
.controller('bbStopLightCtrl', function($scope,$interval){
  // setting options to the function's context
  this.options = $scope.options;
  this.setNextState = function(){
  state = $scope.options.state;
    // setting next state logic
  };
  $interval(this.setNextState,this.options.interval);
});