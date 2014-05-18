 angular.module('AngularBlackBelt.BigData',
  ['AngularBlackBelt.BigDataCharts'])
.directive('bbBarChart', [ function(){
      
      function link(scope,element,attrs){
      
      //setting up the bar chart svg element
      var svg = d3.select(element[0])
      .append("svg")
      .attr("width", w)
      .attr("height", h);

      function redraw(data){
        svg.selectAll('*').remove();
        // redrawing the directive with d3 specific DOM
          manipulation code.
        //when we are calling this function we are also adding
        //event handlers that use the scope.setTheModel function
        //so we can communication with the typeahead function and
          set
        //its internal model
        svg.selectAll("rect")
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .on('click', function(event,clickData){
          scope.setTheModel(clickData);
          scope.$apply();
          });
      }

    scope.$watch('data', function(newData) {
        var graphData = [];
        angular.forEach(newData, function(dataItem) {
            var stats = dataItem.model['yt$statistics'];
         if (stats) {
            graphData.push({
              label: dataItem.label,
              value: parseInt(stats.viewCount, 10)
            });
          } else {
            graphData.push({
              label: dataItem.label,
              value: 0
            });
          } 
         
            if (graphData.length>0) {
              redraw(graphData);
            }
          }, true);}
        
        return {
          restrict: 'A',
          scope: {data: '=', setTheModel: "="},
          link: link
          };
          
}]);
