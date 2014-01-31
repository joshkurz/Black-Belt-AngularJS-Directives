angular.module('AngularBlackBelt.fastClicker', ['AngularBlackBelt.StopWatch'])
.directive('fastClicker', function () {
    return {
        restrict:'EA',
        templateUrl: 'directives/communicationExamples/fastClicker.tpl.html',
        require: ['?stopwatch', '^stopLightContainer'],
        link: function(scope, element, attrs, ctrl){
            
           var raceTime = new Date();
           scope.canClick = function(){
             if(ctrl[1].options.state === 'green'){
                ctrl[1].killInterval();
                ctrl[0] && ctrl[0].startTimer();
                return true;
             } else {
                return false;
             }
           };

           scope.stopRaceTimer = function(){
             ctrl[0] && ctrl[0].stopTimer();
             ctrl[1].setNextState();
           };            
        }
    };
})
.directive('wasFast', ['$compile', function ($compile) {
    return {
        restrict:'EA',
        scope: {time : '='},
        template: '<p class="wideLoad" ng-class="speedClass">{{logText}}<p>',
        link: function(scope, element, attrs){
           
          function changeMessage(){
            scope.logText = scope.time/1000 + ' seconds';
            if(scope.time < 1000){  
              scope.speedClass = 'fast';
              scope.logText += ' (Super Dog Speed)';
            } else if(scope.time < 5000){
              scope.speedClass = 'average';
              scope.logText += ' (Human Speed)';
            } else {
              scope.speedClass = 'slow';
              scope.logText += ' (Super Slow Speed)';
            } 
          } 

          scope.$watch('time', function(newV,oldV){
           changeMessage();
          });

        }
    };
}])
// .directive('wasFast', ['$compile', function ($compile) {
//     return {
//         restrict:'EA',
//         scope: true,
//         template: '<p class="wideLoad" ng-class="speedClass">{{logText}}<p>',
//         link: function(scope, element, attrs){

//            scope.logText = scope[attrs.time]/1000 + ' seconds';

//            if(scope[attrs.time] < 1000){  
//              scope.speedClass = 'fast';
//              scope.runnerSpeed = 100;
//              scope.runner = 'http://www.picgifs.com/dog-graphics/dog-graphics/hunting-dog/dog-graphics-hunting-dog-047205.GIF';
//              scope.logText += ' (Super Dog Speed)';
//            } else if(scope[attrs.time] < 5000){
//              scope.speedClass = 'average';
//              scope.runnerSpeed = 10;
//              scope.runner = 'http://www.picgifs.com/sport-graphics/sport-graphics/running/sport-graphics-running-371709.gif';
//              scope.logText += ' (Human Speed)';
//            } else {
//              scope.speedClass = 'slow';
//              scope.runnerSpeed = 1;
//              scope.runner = 'http://www.picgifs.com/sport-graphics/sport-graphics/running/sport-graphics-running-510249.gif';
//              scope.logText += ' (Super Slow Speed)';
//            }  

//            var fastRunnerElem = angular.element('<marquee behavior="scroll" scrollamount="{{runnerSpeed}}" direction="right"><img ng-src="{{runner}}"/></marquee>');
//            var runnerNode = $compile(fastRunnerElem)(scope);
//            element.append(runnerNode);
//         }
//     };
// }])
.directive('fastRunner', function () {
    return {
        restrict:'EA',
        scope: {time: '=', pics: '='},
        template: '<marquee behavior="scroll" scrollamount="{{runnerSpeed}}" direction="right"><img ng-src="{{pics[runnerSpeed]}}"/></marquee>',
        link: function(scope, element, attrs){
          
          function changeSpeed(){
             if(scope.time < 1000){  
               scope.runnerSpeed = 100;
             } else if(scope.time < 5000){
               scope.runnerSpeed = 10;
             } else {
               scope.runnerSpeed = 1;
             }  
          }

          scope.$watch('time', function(newV,oldV){
            changeSpeed();
          });
        }
    };
});