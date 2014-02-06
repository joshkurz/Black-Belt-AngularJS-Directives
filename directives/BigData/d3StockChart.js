angular.module('AngularBlackBelt.BigDataCharts', [])
.directive('d3StockChart', [ function(){
    
  function link(scope,element,attrs){
    
    var limit = 60 * 1,
          duration = 750,
          now = new Date(Date.now() - duration);

      var width = element.width(),
          height = 500;

      var groups = {
          current: {
              value: 0,
              color: 'orange',
              data: d3.range(limit).map(function() {
                  return 0;
              })
          }
      };

      var x = d3.time.scale()
          .domain([now - (limit - 2), now - duration])
          .range([0, width]);

      var y = d3.scale.linear()
          .domain([0, 100])
          .range([height, 0]);

      var line = d3.svg.line()
          .interpolate('basis')
          .x(function(d, i) {
              return x(now - (limit - 1 - i) * duration);
          })
          .y(function(d) {
              return y(d);
          });

      var svg = d3.select(element[0]).append('svg')
          .attr('class', 'chart')
          .attr('width', width)
          .attr('height', height + 50);

      var axis = svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(x.axis = d3.svg.axis().scale(x).orient('bottom'));

      var paths = svg.append('g');

      for (var name in groups) {
          var group = groups[name];
          group.path = paths.append('path')
              .data([group.data])
              .attr('class', name + ' group')
              .style('stroke', group.color);
      }

      function tick() {
         
          now = new Date();
          var group,
              name;

          // Add new values
          for (name in groups) {
              group = groups[name];
              //group.data.push(group.value) // Real values arrive at irregular intervals
              group.data.push(scope.data?scope.data.price?parseFloat(scope.data.price,10):0:0);
              group.path.attr('d', line);
          }

          // Shift domain
          x.domain([now - (limit - 2) * duration, now - duration]);

          // Slide x-axis left
          axis.transition()
              .duration(duration)
              .ease('linear')
              .call(x.axis);

          // Slide paths left
          paths.attr('transform', null)
              .transition()
              .duration(duration)
              .ease('linear')
              .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
              .each('end', tick);

          // Remove oldest data point from each group
          for (name in groups) {
              group = groups[name];
              group.data.shift();
          }
      }
      
      scope.$watch('data', function(newO,oldO){
        tick();
      },true);

    }
    
    return {
        restrict: 'A',
        scope: {data: '='},
        link: link
    };
    
}]);