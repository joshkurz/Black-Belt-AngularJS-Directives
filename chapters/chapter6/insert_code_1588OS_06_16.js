angular.module('AngularBlackBelt.BigDataCharts', [])
.directive('bbStockChart', [ function(){
    
    function link(scope,element,attrs){
      
      var limit = 60 * 1,
      duration = 750,
      now = new Date(Date.now() - duration),
      color = d3.scale.category20(),
      max = 20,
      x, y, line, svg, axis, paths;

      var width = element.width(),
      height = 500,
      groups = {};

      function resetGroups(tickers){
        //reset the groups the directive
        //uses to create the lines  
      }

      function tick() {
        //tick the graph over and redraw the lines
        //this function uses D3 to update the new data
        //as a new value on the line.
        //we are leaving the D3 code out of this example.
        }
      
      var killLengthWatcher = scope.$watch('tickers.length',
        function(newVal){
        //reset the element completly
        element.html('');
        //reset the max value so we can rescale
        max = 20;
        //reset the current active groups
        resetGroups(scope.tickers);
        });
    
    //whenever the data changes we are calling tick which moves
    //the line over with the new data points.
    var killWatcher = scope.$watchCollection('data', tick);

    scope.$on('$destroy', function(elem){
        killWatcher();
        killLengthWatcher();
        scope.data = null;
        scope.tickers = null;
        });
    }
    
    return {
      restrict: 'A',
      scope: {data: '=',tickers: '='},
      link: link
      };
    
}]);
