angular.module('AngularBlackBelt.BigDataCharts', [])
.directive('bbStockChart', [ function(){
    
  function link(scope,element,attrs){
    
      var limit = 60 * 1,
          duration = 500,
          now = new Date(Date.now() - duration),
          color = d3.scale.category20(),
          padding = 50,
          max = 20,
          x, y, line, svg, xAxis, yAxis, paths,
          margin = {top: 20, right: 10, bottom: 20, left: 10};

      var width = element.width() - margin.left - margin.right,
          height = 500 - margin.bottom - margin.top,
          groups = {};

      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .html(function(d) { return '<span> ' + d[d.length-1].tic + ' <br> $' + d[d.length-1].value + '</span>' ;})
        .offset([0 ,-65]);

      function rangeFunc(){
        return 0;
      }
      
      function resetGroups(tickers){
        
        groups = {};
        for(var i in tickers){
            
            groups[tickers[i]] = {
                value: 0,
                color: color(i),
                data: d3.range(limit).map(rangeFunc)
            }; 
        }

        x = d3.time.scale()
          .domain([now - (limit - 2), now - duration])
          .range([padding+16.5, width]);

        y = d3.scale.linear()
            .domain([0, max])
            .range([height, 0]);

        line = d3.svg.line()
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

        svg = d3.select(element[0]).append('svg')
            .attr('class', 'chart')
            .attr('width', width)
            .attr('height', height + 50);

        svg.call(tip);

        xAxis = svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(x.axis = d3.svg.axis().scale(x).orient('bottom'));

        //Define Y axis
        yAxis = svg.append('g')
            .attr('class', 'y axis')
            .attr("transform", "translate(" + padding + ",0)")
            .call(y.axis = d3.svg.axis().scale(y).orient('left'));

        paths = svg.append('g');

        for (var name in groups) {
            var group = groups[name];
            group.path = paths.append('path')
                .data([group.data])
                .attr('class', name + ' group')
                .style({'stroke-width': '2.5px', 'stroke': group.color})
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);
        }
      }

      function tick() {
         
          now = new Date();
          var group,
              name,
              tic,
              scaleY;

          // slide the x-axis left
          // xAxis.transition()
          //   .call(x.axis);

          // // Shift domain
          x.domain([now - (limit - 2) * duration, now - duration]);

          // Add new values
          for (tic in scope.data) {
            if(groups[tic]){
                var ticData = {tic: tic, 
                               time: scope.data[tic].time,
                               value: scope.data[tic].price?parseFloat(scope.data[tic].price,10):0};
                group = groups[tic];
                group.data.push(ticData);
                group.path.attr('d', line);
                if(max < ticData.value){
                  max = ticData.value;
                  scaleY = true;
                }
                if(group.data.length > 60){
                  group.data.shift();
                } 
             }
          }
          
          //if true then scale the y axis
          if(scaleY === true){
            y.domain([0, max]);
            scaleY = false;
          }

          yAxis.transition()
              .call(y.axis);
      }
      
      var killLengthWatcher = scope.$watch('tickers.length', function(newVal){
        element.html('');
        max = 20;
        resetGroups(scope.tickers);
      });

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