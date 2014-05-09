//http://jsfiddle.net/joshkurz/SupQ2/
app.directive('fastClicker', function () {
  return {
    restrict:'EA',
    template: 'directives/communicationExamples/fastClicker.tpl.html',
    require: '^bbStopLightContainer',
    link: function(scope, element, attrs, ctrl){
      scope.canClick = function(){
        if(ctrl.options.state === 'green'){
          return true;
        } else {
          return false;
        }
      };
    }
  };
});