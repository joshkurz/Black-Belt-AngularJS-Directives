app.directive('fastRunner', function () {
  return {
    restrict:'EA',
    template: '<marquee behavior="scroll" scrollamount="{{speed}}" direction="right"><img ng-src="{{runner}}"/></marquee>',
    link: function(scope, element, attrs){
    
      function getTheAttrs(){
        return attrs.runner + attrs.speed;
      }

      scope.$watch(getTheAttrs, function(){
        scope.runner = attrs.runner;
        scope.speed = parseInt(attrs.speed,10);
      });
     }
  };
});