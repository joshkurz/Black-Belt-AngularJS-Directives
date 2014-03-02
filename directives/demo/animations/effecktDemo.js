// <div class="well container">
//     <select ng-model="animationType" ng-options="option for option in animationOptions"></select>
//     <button class="effeckt-button btn" ng-repeat="player in players" data-effeckt-type="{{animationType}}" ng-click="loadPowers(player)">
//         <span class="label">{{player.name}}</span> 
//         <span class="spinner"></span>
//     </button>
// </div>

//http://jsfiddle.net/joshkurz/EsPde/

var app = angular.module('Effects', [])
.controller('effecktCtrl', ['$scope', '$timeout', function($scope, $timeout){
    
    $scope.buttonAnimationType = 'slide-right';
    $scope.buttonAnimationOptions = ['slide-right', 'expand-right', 'expand-left', 'expand-up', 'expand-down', 'slide-left', 'slide-up', 'slide-down', 'zoom-in', 'zoom-out'];
    $scope.listAnimationType = 'grow';
    $scope.listAnimationOptions = ['grow', 'curl', 'wave', 'fan', 'fade', 'fly', 'landing', 'swing-front', 'swing-back', 'twist', 'door', 'climb'];
    
}]);