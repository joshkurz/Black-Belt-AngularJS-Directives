angular.module('DemoExamples')
.directive('demoTransclusion', function(){
  return{
    restrict: 'EA',
    transclude: true,
    template: '<div class="container">' +
        '<div ng-transclude><div>' +
        '</div>',
        // simplified for readability
    };
}]);