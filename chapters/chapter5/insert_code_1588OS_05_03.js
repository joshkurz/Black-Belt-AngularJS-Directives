angular.module('scopeDemonstration', [])
.directive('bbHelloChild', function () {
  return {
    restrict: 'A',
    scope: true,
    template: '<input ng-model="hey">'
  };
});