//http://jsfiddle.net/joshkurz/DsvX6/26/
angular.module('treeNodeTemplateModule', ['directives/treeNodes/treeNodeTemplate.tpl.html'])
.directive("treeNodeTemplate", function($compile) {
    return {
        restrict: "EA",
        transclude: true,
        scope: {family: '='},
        templateUrl: 'directives/treeNodes/treeNodeTemplate.tpl.html',
        compile: function(tElement, tAttr, transclude) {
            var contents = tElement.contents().remove();
            var compiledContents;
            return function(scope, iElement, iAttr) {
                if(!compiledContents) {
                    compiledContents = $compile(contents, transclude);
                }
                
                scope.family.show = true;
                               
                compiledContents(scope, function(clone, scope) {
                         iElement.append(clone); 
                });
            };
        }
    };
});
