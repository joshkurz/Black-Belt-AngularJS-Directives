angular.module('AngularBlackBelt.StopLightDemo', [])
.controller('demoStopLightCtrl', ['$scope', function($scope){
    
    $scope.states = [{
        lineWidth: 6,
        strokeStyle: 'white',
        radius: 60,
        state: 'green',
        interval: 1000
    },{
        lineWidth: 6,
        strokeStyle: 'white',
        radius: 60,
        state: 'red',
        reverse: true,
        interval: 3000
    }];
    
    $scope.stopAllStates = function(){
        for(var i = 0;i < $scope.states.length;i++){
            $scope.states[i].state = 'red';
        }
    };
        
}]);