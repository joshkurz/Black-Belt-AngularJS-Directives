/* HTML Templates
<div bb-string term="{{term}}"></div>
<div bb-expression term="theTerm = term + ' AngularJS Directives'"></
div>
<div bb-two-way term="term"></div>

/* Demo Javascript Module */
angular.module('demoApp', [])
  .controller('demoCtrl', function($scope){
    $scope.term = 'How To Master';
})
.directive('bbString', function(){
  return {
    scope: { term: '@'},
    template: '<input ng-model="term">'
  }
})
.directive('bbExpression', function(){
  return {
    scope: { term: '&'},
    template: '<input ng-model="term">',
    link: function(scope, element, attrs){
      scope.term = scope.term();
    }
  }
})
.directive('bbTwoWay', function(){
  return {
    scope: { term: '='},
    template: '<input ng-model="term">'
  }
});