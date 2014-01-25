angular.module('AngularBlackBelt.demo/stopLight', [])
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

    $scope.fastClickState = {
        lineWidth: 6,
        strokeStyle: 'white',
        radius: 60,
        state: 'red',
        reverse: true,
        interval: 3000
    };

    $scope.stopwatch = {interval: 100, log: []};
    
    $scope.resetState = function(state){
      state.state = 'red';
    };
        
}]);