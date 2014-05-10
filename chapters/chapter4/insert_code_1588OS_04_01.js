<super-component>
  <span> {{world}} </span>
</super-component>

app.directive('superComponent', function () {
  return {
    restrict:'E',
    template: '<div><strong>{{hello}}</strong> <span ng-transclude></span></div>',
    transclude: true,
    scope: true,
    link :function(scope, element, attrs){
      scope.hello = ' HELLO!';
    }
  };
});