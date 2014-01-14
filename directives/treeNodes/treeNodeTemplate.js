//http://jsfiddle.net/joshkurz/DsvX6/26/
angular.module('treeNodeTemplateModule', ['directives/treeNodes/treeNodeTemplate.tpl.html'])
.directive("treeNodeTemplate", function($compile) {
    return {
        restrict: "EA",
        transclude: true,
        scope: {family: '='},
        templateUrl: 'directives/treeNodes/treeNodeTemplate.tpl.html',
        compile: function(tElement, tAttr) {
            var contents = tElement.contents().remove();
            var compiledContents;
            return function(scope, element, attrs, ctrl, transclude) {
                
                scope.family.show = true;
                
                compiledContents = $compile(contents, transclude);
                               
                compiledContents(scope, function(clone, scope) {
                  element.append(clone); 
                });
            };
        }
    };
});
