// now bbStopLight requires the bbStopLightContainers Controller
angular.module('TrafficLight')
.directive('bbStopLight', function(svgService) {
  return {
    require: '^bbStopLightContainer',
    scope: {},
    link: function(scope,element,attrs,stopLightCtrl) {
      // the logic that determines what to do with the
      // linked stop light element
    }
  };
});