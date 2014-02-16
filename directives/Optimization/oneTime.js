var optimization = angular.module('AngularBlackBelt.Optimization', []);

angular.forEach(['Src', 'Text', 'Href'], function(v){
    var directiveName = 'bbOneTime'+v;
    optimization.directive(directiveName, function(){
        return {
            restrict: 'EA',
            link: function(scope, element, attrs){
                function watcherFn() { return scope.$eval(attrs[directiveName]); }
                var rmWatcher = scope.$watch(watcherFn, function(newV,oldV){
                    if(newV){
                      if(v === 'Text'){
                        element[v.toLowerCase()](newV);
                      } else {
                        element.attr(v.toLowerCase(), newV);
                      }
                      rmWatcher();
                    }
                });
            }
        }
    });
});