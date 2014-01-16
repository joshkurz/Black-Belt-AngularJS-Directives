// http://jsfiddle.net/joshkurz/JNndE/2/
// <div ng-controller="SuperCtrl" class="jumbotron">
//     <div ng-repeat="number in numbers">
//       <super-component>
//             <span> {{number}}</span>
//       </super-component>
//     </div>
//     <super-component>
//       <span> Static Text</span>
//     </super-component>
// </div>
var myModule = angular.module('myModule', [])
.directive('superComponent', function () {
    return {
        restrict:'E',
        template: '<div><strong>{{hello}}</strong></div>',
        transclude: true,
        replace: true,
        scope: true,
        compile: function(tElem,tAttrs){
           return function(scope, element, attrs, ctrl, transclude){
            scope.hello = 'HELLO ';
            scope.number = "World " + scope.number;
            transclude(scope, function(clone){
              element.append(clone);                       
            });
           }            
        }
    };
})
.controller('SuperCtrl', ['$scope', function ($scope) {
    $scope.numbers = [1,2,3,4,5,6,7,8,9,10];
}]);




