//http://jsfiddle.net/joshkurz/DsvX6/26/
angular.module('treeNodeTemplateModule', [])
.directive("treeNodeTemplate", function($compile) {
    return {
        restrict: "EA",
        transclude: true,
        scope: {family: '='},
        template:       
            '<ul class="list-group">' + 
              '<li class="list-group-item" ng-transclude></li>' +
               '<li class="list-group-item" ng-if="family.show" ng-repeat="child in family.children">' +
                 '<div tree-node-template family="child"><div ng-transclude></div></div>' +
                '</li>' +
            '</ul>',
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
