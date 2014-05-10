//http://embed.plnkr.co/FwI7Lz/preview
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
                
                //setting the value to true so the tree will always start open. This could be a configuration of some sort.
                scope.family.show = true;
                
                if(!compiledContents){
                  compiledContents = $compile(contents, transclude);
                }
                                  
                compiledContents(scope, function(clone) {
                  element.append(clone); 
                });
            };
        }
    };
});