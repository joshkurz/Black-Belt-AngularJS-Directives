// <div ng-app="demoApp" ng-controller="demoCtrl">
//     <script id="/test1.tpl.html" type="text/ng-template">
//       <div>{{test}}</div>
//     </script>

//     <script id="/test2.tpl.html" type="text/ng-template">
//       <div>{{test}} plus another {{test}}</div>
//     </script>
    
//     <button ng-click="templateVar = '/test1.tpl.html'">Test 1</button>
//     <button ng-click="templateVar = '/test2.tpl.html'">Test 2</button>
//     {{templateVar}}
//     <div dynamic-template template-var="{{templateVar}}"></div>
// </div>

angular.module('demoApp', [])
.controller('demoCtrl', function($scope){
    $scope.templateVar = '/test1.tpl.html';
})
.directive('dynamicTemplate', ['$compile', '$templateCache',         function($compile, $templateCache){
    return {  
        scope: { templateVar: '@'},
        link: function(scope, element, attrs){
            
            scope.test = 'Hello World';
            scope.$watch('templateVar', function(newV,oldV){

                if(newV !== undefined){
                    var newElement = $compile($templateCache.get(newV).trim())(scope);
                    element.html('');
                    element.append(newElement[0]);

                }

            });

        }

    }

}]);
