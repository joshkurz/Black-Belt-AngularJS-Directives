//http://jsfiddle.net/joshkurz/8W2Z5/
angular.module('GaugeJs', []).directive('gaugeJs', function(){
  return {
    restrict: 'A',
    scope: {
      options:'=',
      currentValue: '=ngModule'
    },
    compile: function(tElem, tAttrs){
      if ( tElem[0].tagName !== 'CANVAS' ) {
        throw new Error('guage-js can only be set on a canvas element. ' + tElem[0].tagName + ' will not work.');
      }
      return function(scope, element, attrs){
        var gauge;
        function setGauge(options){
          gauge = new Gauge(element[0]).setOptions(scope.options);
          gauge.maxValue = scope.options.maxValue; // set max gauge value
          gauge.set(scope.currentValue);
        }
        
        scope.$watch('options', function(newV, oldV){
          setGauge(scope.options);
        },true);
        
        scope.$watch('currentValue', function(newV,oldV){
          if(scope.currentValue > scope.options.maxValue){
            gauge.set(scope.options.maxValue);
          } else {
            gauge.set(scope.currentValue);
          }
        });
       };
    }
  };
});