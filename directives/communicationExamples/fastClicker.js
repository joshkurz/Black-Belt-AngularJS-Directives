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
.directive('wasFast', ['$compile', function ($compile) {
    return {
        restrict:'EA',
        scope: true,
        template: '<p class="wideLoad">{{logText}}<p>',
        link: function(scope, element, attrs, ctrl){

           var speedClass = '',
               runner = '',
               runnerSpeed = 0;

           scope.logText = scope[attrs.time]/1000 + ' seconds';

           if(scope[attrs.time] < 1000){  
             speedClass = 'fast';
             runnerSpeed = 100;
             runner = 'http://www.picgifs.com/dog-graphics/dog-graphics/hunting-dog/dog-graphics-hunting-dog-047205.GIF';
             scope.logText += ' (Super Dog Speed)';
           } else if(scope[attrs.time] < 5000){
             speedClass = 'average';
             runnerSpeed = 10;
             runner = 'http://www.picgifs.com/sport-graphics/sport-graphics/running/sport-graphics-running-371709.gif';
             scope.logText += ' (Human Speed)';
           } else {
             speedClass = 'slow';
             runnerSpeed = 1;
             runner = 'http://www.picgifs.com/sport-graphics/sport-graphics/running/sport-graphics-running-510249.gif';
             scope.logText += ' (Super Slow Speed)';
           }  

           element.addClass(speedClass);
           var runnerNode = $compile(angular.element('<div fast-runner runner="' + runner + '" speed="' + runnerSpeed + '"></div>'))(scope);
           element.append(runnerNode);
        }
    };
}])
.directive('fastRunner', ['$interval', function ($interval) {
    return {
        restrict:'EA',
        scope: true,
        template: '<marquee behavior="scroll" scrollamount="{{speed}}" direction="right"><img ng-src="{{runner}}"/></marquee>',
        link: function(scope, element, attrs, ctrl){
            
            var interval;
            scope.runner = attrs.runner;
            scope.speed = parseInt(attrs.speed,10);
        }
    };
}]);