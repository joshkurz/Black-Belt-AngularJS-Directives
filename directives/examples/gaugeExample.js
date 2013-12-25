angular.module('gaugeDemo', [])
.controller('gaugeDemoCtrl', ['$scope', function($scope){
    $scope.demoOptions = {
      lines: 12,
      angle: 0.00,
      lineWidth: 0.25,
      pointer: {
        length: 0.9,
        strokeWidth: 0.035 
      },
      colorStart: '#6FADCF',  
      colorStop: '#8FC0DA',   
      strokeColor: '#E0E0E0',   
      maxValue: 10
    };
    
    $scope.demoValue = 2;
}])
.directive('gaugeJs', function(){
    return {
        restrict: 'A',
        scope: {
            options:'=',
            currentValue: '='    
        },
        link: function(scope, element, attrs){
            var gauge = new Gauge(element[0]).setOptions(scope.options);
            gauge.maxValue = scope.options.maxValue; // set max gauge value
            
            scope.$watch('currentValue', function(newV,oldV){
                   gauge.set(scope.currentValue); // set actual value   
            });
        }
    };
});