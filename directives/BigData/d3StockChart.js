angular.module('AngularBlackBelt.BigDataCharts', [])
.directive('d3StockChart', [ function(){
    
  function link(scope,element,attrs){
    
      var limit = 60 * 1,
          duration = 750,
          now = new Date(Date.now() - duration),
          color = d3.scale.category20(),
          max = 20;

      var width = element.width(),
          height = 500,
          groups = {};

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .html(function(d) { return '<span> ' + d[d.length-1].tic + ' <br> $' + d[d.length-1].value + '</span>' ;})
        .offset([0 ,-65]);

      function rangeFunc(){
        return 0;
      }
      
      for(var i in scope.tickers){
         
         groups[scope.tickers[i]] = {
              value: 0,
              color: color(i),
              data: d3.range(limit).map(rangeFunc)
          };
      }

      var x = d3.time.scale()
          .domain([now - (limit - 2), now - duration])
          .range([0, width]);

      var y = d3.scale.linear()
          .domain([0, max])
          .range([height, 0]);

      var line = d3.svg.line()
          .interpolate('basis')
          .x(function(d, i) {
              return x(now - (limit - 1 - i) * duration);
          })
          .y(function(d) {
              if(d.value){
                return y(d.value);
              } else {
                return y(d);
              }
          });

      var svg = d3.select(element[0]).append('svg')
          .attr('class', 'chart')
          .attr('width', width)
          .attr('height', height + 50);

      svg.call(tip);

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
              .style({'stroke-width': '3px', 'stroke': group.color})
              .on('mouseover', tip.show)
              .on('mouseout', tip.hide);
      }

      function tick() {
         
          now = new Date();
          var group,
              name,
              tic;

          // Add new values
          for (tic in scope.data) {
              var ticData = {tic: tic, value: scope.data[tic].price?parseFloat(scope.data[tic].price,10):0};
              group = groups[tic];
              group.data.push(ticData);
              group.path.attr('d', line);
              if(max < ticData.value){
                max = ticData.value;
                y.domain([0, max]);
              }
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
          
          function returnData(d) { return d.value; }
          // Remove oldest data point from each group
          for (tic in scope.data) {
              group = groups[tic];
              group.data.shift();
          }
      }
      
      var killWatcher = scope.$watchCollection('data', function(newO,oldO){
        if(newO){
          tick();
        }
      },true);

      scope.$on('$destroy', function(elem){
        killWatcher();
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