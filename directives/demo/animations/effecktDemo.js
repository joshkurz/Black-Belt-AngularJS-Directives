// <div class="well container">
//     <select ng-model="animationType" ng-options="option for option in animationOptions"></select>
//     <button class="effeckt-button btn" ng-repeat="player in players" data-effeckt-type="{{animationType}}" ng-click="loadPowers(player)">
//         <span class="label">{{player.name}}</span> 
//         <span class="spinner"></span>
//     </button>
// </div>

//http://jsfiddle.net/joshkurz/EsPde/

var app = angular.module('effecktDemo', [])
.controller('demoCtrl', ['$scope', '$timeout', function($scope, $timeout){
    
    $scope.animationType = 'slide-right';
    $scope.animationOptions = ['slide-right', 'expand-right', 'expand-left', 'expand-up', 'expand-down', 'slide-left', 'slide-up', 'slide-down', 'zoom-in', 'zoom-out'];
    $scope.players = [{"name": "Johnny Bravo", "powers": ["mojo"]},{"name": "Superman", "powers": ["*"]},{"name": "Catwoman", "powers": ["climbing","scratching"]},{"name": "Robin", "powers": ["sidekicking", "diversions"]},{"name": "Yoda", "power": ["force","lightsaber"]}];
    
}])
.directive('effecktButton', ['$timeout', function($timeout){
    
    return {
        restrict: 'AC',
        link: function(scope, element, attrs){
           
            scope.loadPowers = function(){
                if(element.attr('data-loading')){
                    element.removeAttr('data-loading');
                } else {
                  element.attr('data-loading', true);
                  $timeout(function(){
                    element.removeAttr('data-loading');
                  },2000);
                }
             }    
        }
    }
}]);