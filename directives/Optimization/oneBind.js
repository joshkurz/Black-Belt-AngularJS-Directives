var oneTimers = angular.module('OneBinders', []);

angular.forEach([{tag: 'Src', method: 'attr'}, {tag: 'Text', method: 'text'}, 
                 {tag: 'Href', method: 'attr'}, {tag: 'Class', method: 'addClass'}, 
                 {tag: 'Html', method: 'html'}, {tag: 'Alt', method: 'attr'}, 
                 {tag: 'Style', method: 'css'}, {tag: 'Value', method: 'attr'}, 
                 {tag: 'Id', method: 'attr'}, {tag: 'Title', method: 'attr'}], function(v){
    var directiveName = 'bbOneBind'+v.tag;
    oneTimers.directive(directiveName, function(){
        return {
            restrict: 'EA',
            link: function(scope, element, attrs){
                function watcherFn() { return scope.$eval(attrs[directiveName]); }
                var rmWatcher = scope.$watch(watcherFn, function(newV,oldV){
                    if(newV){
                        if(v.method === 'attr'){
                          element[v.method](v.tag.toLowerCase(),newV);
                        } else {
                          element[v.method](newV);
                        }
                        rmWatcher();
                    }
                });
            }
        };
    });
});