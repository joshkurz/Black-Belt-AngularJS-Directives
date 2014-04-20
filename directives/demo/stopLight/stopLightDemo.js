angular.module('AngularBlackBelt.demo/stopLight', ['directives/communicationExamples/fastClicker.tpl.html'])
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

    $scope.pics = {
                      100: '/dist/images/runningDog.gif',
                      10:  '/dist/images/runningHuman.gif',
                      1 :  '/dist/images/runningSuperSlow.gif'
                   };

    $scope.stopwatch = {interval: 100, log: []};
    
    $scope.resetState = function(state){
      state.state = 'red';
    };
        
}]);