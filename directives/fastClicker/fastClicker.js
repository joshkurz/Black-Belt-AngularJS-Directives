var myModule = angular.module('AngularBlackBelt.fastClicker', ['AngularBlackBelt.StopWatch'])
.directive('fastClicker', function () {
    return {
        restrict:'EA',
        template: '<button class="btn" ng-click="stopRaceTimer()" ng-disabled="canClick() == false">Race</buton>',
        require: ['stopwatch', '^stopLightContainer'],
        link: function(scope, element, attrs, ctrl){
            
           var raceTime = new Date();
           scope.canClick = function(){
             if(ctrl[1].options.state === 'green'){
                ctrl[1].killInterval();
                ctrl[0].startTimer();
                return true;
             } else {
                return false;
             }
           };

           scope.stopRaceTimer = function(){
             ctrl[0].stopTimer();
             ctrl[1].setNextState();
           };            
        }
    };
})
.directive('wasFast', function () {
    return {
        restrict:'EA',
        scope: true,
        template: '<p ng-class="wasItFast()">{{logText}}<p>',
        link: function(scope, element, attrs, ctrl){

           var speedClass = '';
           scope.logText = scope[attrs.time]/1000 + ' seconds';

           if(scope[attrs.time] < 1000){  
             speedClass = 'fast';
             scope.logText += ' (Super Human Speed)';
           } else if(scope[attrs.time] < 2000){
             speedClass = 'average';
             scope.logText += ' (Human Speed)';
           } else {
             speedClass = 'slow';
             scope.logText += ' (Troll Speed)';
           }  

           element.addClass(speedClass);
  
        }
    };
});