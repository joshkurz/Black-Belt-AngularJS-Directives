 /*
  * The Stopwatch module consists of one directives, one controller, and one filter. 
  */
angular.module('AngularBlackBelt.StopWatch', [])
.controller('stopwatchCtrl', ['$scope', 'StopwatchFactory',    function($scope, StopwatchFactory){
    
    this.stopwatchService = new StopwatchFactory($scope.options);

}])
.filter('stopwatchTime', function () {
    return function (input) {
        if(input){
            
            var elapsed = input.getTime();
            var hours = parseInt(elapsed / 3600000,10);
            elapsed %= 3600000;
            var mins = parseInt(elapsed / 60000,10);
            elapsed %= 60000;
            var secs = parseInt(elapsed / 1000,10);
            var ms = elapsed % 1000;
            
            return hours + ':' + mins + ':' + secs + ':' + ms;
        }
    };
})


// Version 1
// .directive('bbStopwatch', ['StopwatchFactory', function(StopwatchFactory){
//     return {
//         restrict: 'EA',
//         scope: true,
//         link: function(scope, elem, attrs){   
            
//             if (!attrs.options){
//                  throw new Error('Must Pass an options object from the Controller For the Stopwatch to Work Correctly.');
//             }

//             var stopwatchService = new StopwatchFactory(scope[attrs.options]);
            
//             scope.startTimer = stopwatchService.startTimer; 
//             scope.stopTimer = stopwatchService.stopTimer;
//             scope.resetTimer = stopwatchService.resetTimer;
            
//         }
//     };
// }])

// Version 2
//  .directive('bbStopwatch', ['StopwatchFactory', function(StopwatchFactory){
//     return {
//         restrict: 'EA',
//         scope: {options: '='},
//         transclude: true,
//         link: function(scope, elem, attrs, controller, transclude){   
                
//               if (!attrs.options){
//                 throw new Error('Must Pass an options object from the Controller For the Stopwatch to Work Correctly.');
//               }
              
//               var overrideScope = attrs.override,
//                   stopwatchService = new StopwatchFactory(scope.options);

//               function transcludeFn(clone){
//                 elem.append(clone);
//               }
              
//               scope.startTimer = stopwatchService.startTimer; 
//               scope.stopTimer = stopwatchService.stopTimer;
//               scope.resetTimer = stopwatchService.resetTimer;

//               if(overrideScope){
//                 transclude(scope,transcludeFn);
//               } else {
//                 transclude(transcludeFn);
//               }
//         }
//     };
// }]);


// Version 2.1
// .directive('bbStopwatch', ['StopwatchFactory', function(StopwatchFactory){
//     return {
//         restrict: 'EA',
//         scope: true,
//         link: function(scope, elem, attrs){   
            
//             if (!attrs.options){
//                  throw new Error('Must Pass an options object from the Controller For the Stopwatch to Work Correctly.');
//             }

//             var stopwatchService = new StopwatchFactory(scope[attrs.options]);
            
//             scope.startTimer = stopwatchService.startTimer; 
//             scope.stopTimer = stopwatchService.stopTimer;
//             scope.resetTimer = stopwatchService.resetTimer;

//             $scope.$on('$destroy', function(node){
//               stopwatchService.cancelTimer(); 
//             });
            
//         }
//     };
// }])

// Version 3
 .directive('bbStopwatch', function(){
    return {
        restrict: 'EA',
        scope: {options: '='},
        controller: 'stopwatchCtrl',
        transclude: true,
        compile: function(tElem, tAttrs){
            
            if (!tAttrs.options){
                 throw new Error('Must Pass an options object from the Controller For the Stopwatch to Work Correctly.');
            }

            var overrideScope = tAttrs.override;
            
            return function(scope, elem, attrs, controller, transclude){   

              function transcludeFn(clone){
                elem.append(clone);
              }
              
              scope.startTimer = controller.stopwatchService.startTimer; 
              scope.stopTimer = controller.stopwatchService.stopTimer;
              scope.resetTimer = controller.stopwatchService.resetTimer;

              if(overrideScope){
                transclude(scope,transcludeFn);
              } else {
                transclude(transcludeFn);
              }

              scope.$on('$destroy', function(node){
                controller.stopwatchService.cancelTimer(); 
              });
            };
        }
    };
})

// factory function
.factory('StopwatchFactory', ['$interval',    function($interval){
    
    return function(options){

        var startTime = 0,
            currentTime = null,
            offset = 0,
            interval = null,
            self = this;
        
        if(!options.interval){
            options.interval = 100;
        }

        options.elapsedTime = new Date(0);

        self.running = false;
        
        function pushToLog(lap){
            if(options.log !== undefined){
               options.log.push(lap); 
            }
        }
         
        self.updateTime = function(){
            currentTime = new Date().getTime();
            var timeElapsed = offset + (currentTime - startTime);
            options.elapsedTime.setTime(timeElapsed);
        };

        self.startTimer = function(){
            if(self.running === false){
                startTime = new Date().getTime();
                interval = $interval(self.updateTime,options.interval);
                self.running = true;
            }
        };

        self.stopTimer = function(){
            if( self.running === false) {
                return;
            }
            self.updateTime();
            offset = offset + currentTime - startTime;
            pushToLog(currentTime - startTime);
            $interval.cancel(interval);  
            self.running = false;
        };

        self.resetTimer = function(){
          startTime = new Date().getTime();
          options.elapsedTime.setTime(0);
          timeElapsed = offset = 0;
        };

        self.cancelTimer = function(){
          $interval.cancel(interval);
        };

        return self;

    };


}]);