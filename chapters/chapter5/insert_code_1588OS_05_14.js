angular.module('AngularBlackBelt.fastClicker', ['AngularBlackBelt.StopWatch'])
.directive('fastClicker', function () {
    return {
        restrict:'EA',
        templateUrl: 'directives/communicationExamples/fastClicker.tpl.html',
        require: ['?bbStopwatch', '^bbStopLightContainer'],
        link: function(scope, element, attrs, ctrl){
            
           var raceTime = new Date();
           scope.canClick = function(){
             if(ctrl[1].options.state === 'green'){
                ctrl[1].killInterval();
                ctrl[0] && ctrl[0].stopwatchService.startTimer();
                return true;
             } else {
                return false;
             }
           };

           scope.stopRaceTimer = function(){
             ctrl[0] && ctrl[0].stopwatchService.stopTimer();
             ctrl[1].setNextState();
           };            
        }
    };
})