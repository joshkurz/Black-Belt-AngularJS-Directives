angular.module('AngularBlackBelt.BigData', ['AngularBlackBelt.BigDataCharts'])
.controller('d3ExampleController', function($scope){
// Generate some random data
$scope.data = [];
for (i = 0; i < 4; i++) {
    $scope.data.push({
        "value": Math.random(),
        "label": i
    });
}
    
})
.directive('svgD3MenuBar', [ function(){
    
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


      function redraw(data){

        x.domain(data.map(function(d) { return d.label; }));
        y.domain([0, d3.max(data, function(d) { return d.value; })]);
        
        //Create SVG element
        var svg = d3.select(element[0])
              .append("svg")
              .attr("width", w)
              .attr("height", h);

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
          
        svg.selectAll("rect").on('mouseover', tip.show)
                             .on('mouseout', tip.hide)
                             .on('click', function(event,clickData){
                               scope.setTheModel(clickData);
                               scope.$apply();
                             });
      }

      scope.$watch('data', function(newO,oldO){
        var newData = [];
        element.html('');
        for(var da in scope.data){
          if(scope.data[da].model['yt$statistics']){
            var newVideoObj = {};
            newVideoObj.label = scope.data[da].label;
            newVideoObj.value = parseInt(scope.data[da].model['yt$statistics'].viewCount,10);
            newData.push(newVideoObj);
          }
        }
        if(newData.length>0){
          redraw(newData);
        }
      },true);
       
    }
    
    return {
        restrict: 'A',
        scope: {data: '=', setTheModel: "="},
        link: link
    };
    
}]);