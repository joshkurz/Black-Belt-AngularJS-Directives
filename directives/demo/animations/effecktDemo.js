// <div class="well container">
//     <select ng-model="animationType" ng-options="option for option in animationOptions"></select>
//     <button class="effeckt-button btn" ng-repeat="player in players" data-effeckt-type="{{animationType}}" ng-click="loadPowers(player)">
//         <span class="label">{{player.name}}</span> 
//         <span class="spinner"></span>
//     </button>
// </div>

//http://jsfiddle.net/joshkurz/EsPde/

var app = angular.module('Effects', ['directives/demo/animations/animateMe.tpl.html'])
.controller('effecktCtrl', ['$scope', '$timeout', function($scope, $timeout){
    
    $scope.buttonAnimationType = 'slide-right';
    $scope.buttonAnimationOptions = ['slide-right', 'expand-right', 'expand-left', 'expand-up', 'expand-down', 'slide-left', 'slide-up', 'slide-down', 'zoom-in', 'zoom-out'];
    $scope.listAnimationType = 'grow';
    $scope.listAnimationOptions = ['grow', 'curl', 'wave', 'fan', 'fade', 'fly', 'landing', 'swing-front', 'swing-back', 'twist', 'door', 'climb'];
    
}])
.directive('glowingDiv', ['$animate', function($animate){
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
}])
.animation('.animateMe', function(){
  return {
    enter: function(element, done){
        TweenMax.fromTo(element, 0.7, {
            boxShadow: "0px 0px 0px 0px rgba(0,255,0,0.3)"
        }, {
            boxShadow: "0px 0px 20px 10px rgba(0,255,0,0.7)",
            repeat: -1,
            yoyo: true,
            ease: Linear.easeNone,
            onComplete: done
        });
    }
  };
});