app.directive('wasFast', function () {
  return {
    restrict:'EA',
    scope: true,
    template: '<p class="wideLoad" ng-class="speedClass">{{logText}}<p>',
    link: function(scope, element, attrs){
      
      scope.logText = scope[attrs.time]/1000 + ' seconds';
      
      if(scope[attrs.time] < 1000){
        scope.speedClass = 'fast';
        scope.logText += ' (Super Dog Speed)';
      } else if(scope[attrs.time] < 5000){
        scope.speedClass = 'average';
        scope.logText += ' (Human Speed)';
      } else {
        scope.speedClass = 'slow';}
        scope.logText += ' (Super Slow Speed)';
      }
    };
});