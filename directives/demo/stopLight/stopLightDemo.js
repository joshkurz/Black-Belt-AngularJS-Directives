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
                      100: 'http://www.picgifs.com/dog-graphics/dog-graphics/hunting-dog/dog-graphics-hunting-dog-047205.GIF',
                      10:  'http://www.picgifs.com/sport-graphics/sport-graphics/running/sport-graphics-running-371709.gif',
                      1 :  'http://www.picgifs.com/sport-graphics/sport-graphics/running/sport-graphics-running-510249.gif'
                     };

    $scope.stopwatch = {interval: 100, log: []};
    
    $scope.resetState = function(state){
      state.state = 'red';
    };
        
}]);