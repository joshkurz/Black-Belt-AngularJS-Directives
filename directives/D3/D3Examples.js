angular.module('AngularBlackBelt.D3', [])
.directive('bbHeatMap', function(){
    
    return {
        scope: true,
        link: function(scope, element, attrs){
            var width = 960,
                height = 500;
            
            var projection = d3.geo.albers()
                .scale(1000);
            
            var canvas = d3.select(element[0]).append("canvas")
                .attr("width", width)
                .attr("height", height);
            
            var context = canvas.node().getContext("2d");
            
            var path = d3.geo.path()
                .projection(projection)
                .context(context);
            
            d3.json("/vendor/d3/geoData.json", function(error, us) {
              path(topojson.feature(us, us.objects.counties));
              context.stroke();
            });
        }
    };
    
})
.directive('bbTimeline', function(){
    
    return {
        scope: true,
        link: function(scope, element, attrs){
                // Define domElement and sourceFile
                var domElement = element[0];
                var sourceFile = "/vendor/d3/philosophers.csv";

                // Read in the data and construct the timeline
                d3.csv(sourceFile, function(dataset) {

                    timeline(domElement)
                        .data(dataset)
                        .band("mainBand", 0.82)
                        .band("naviBand", 0.08)
                        .xAxis("mainBand")
                        .tooltips("mainBand")
                        .xAxis("naviBand")
                        .labels("mainBand")
                        .labels("naviBand")
                        .brush("naviBand", ["mainBand"])
                        .redraw();

                });
        }
    };
    
});