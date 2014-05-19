app.directive('glowingDiv', ['$animate', function($animate){
   return {
      restrict: 'AC',
      scope: true,
      templateUrl: 'directives/demo/animations/animateMe.tpl.html',
      link: function(scope, element, attrs){

        var parentNode = element.parent();
        scope.addElement = function(){
            var toBeAnimatedNode = angular.element('<div class="animateMe">Hey Animate Me</div>');
            $animate.enter(toBeAnimatedNode, parentNode, element);
        };
      }
   };
}]);
