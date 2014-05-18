angular.module('AngularBlackBelt.BigData', ['AngularBlackBelt.BigDataCharts'])
.directive('bbBarChart', [ function(){
    
    function link(scope,element,attrs){
       
      var w = 680;
      var h = 100;
      var barPadding = 3;

      var x = d3.scale.ordinal()
          .rangeRoundBands([0, w], 0.1);

      var y = d3.scale.linear()
          .range([h, 0]);

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .html(function(d) { return '<span>' + d.label + '<br><br> ' + d.value + '</span>' + ' Views' ;})
        .offset([-17 ,-65]);
      
      //Create SVG element
      var svg = d3.select(element[0])
            .append("svg")
            .attr("width", w)
            .attr("height", h);

      function redraw(data){
        svg.selectAll('*').remove();
        x.domain(data.map(function(d) { return d.label; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);

        var vis = svg.selectAll("rect")
           .data(data)
           .enter()
           .append("rect")
           .attr("class", "menuBar")
           .attr("x", function(d, i) {
              return i * (w / data.length);
           })
           .attr("y", function(d) {
              return y(d.value);
           })
           .attr("width", w / data.length - barPadding)
           .attr("height", function(d) {
              return h - y(d.value);
           });

        vis.call(tip); 
          
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
        });
        if (graphData.length>0) {
          redraw(graphData);
        }
      }, true);

       
    }
    
    return {
        restrict: 'A',
        scope: {data: '=', setTheModel: "="},
        link: link
    };
    
}]);