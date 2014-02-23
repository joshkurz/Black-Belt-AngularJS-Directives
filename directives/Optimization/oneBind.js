//http://jsfiddle.net/joshkurz/nZJEp/2/
var oneBinders = angular.module('OneBinders', []);

angular.forEach([{tag: 'Src', method: 'attr'}, {tag: 'Text', method: 'text'}, 
                 {tag: 'Href', method: 'attr'}, {tag: 'Class', method: 'addClass'}, 
                 {tag: 'Html', method: 'html'}, {tag: 'Alt', method: 'attr'}, 
                 {tag: 'Style', method: 'css'}, {tag: 'Value', method: 'attr'}, 
                 {tag: 'Id', method: 'attr'}, {tag: 'Title', method: 'attr'}], function(v){
    var directiveName = 'bbOneBind'+v.tag;
    oneBinders.directive(directiveName, function(){
        return {
            restrict: 'EA',
            link: function(scope, element, attrs){
                var rmWatcher = scope.$watch(attrs[directiveName], function(newV,oldV){
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