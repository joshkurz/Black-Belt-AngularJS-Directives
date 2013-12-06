 /*
  * The StopWatch module consists of one directives, one controller, and one filter. 
  */
angular.module('StopWatch', [])
.controller('stopWatchCtrl', ['$scope', '$interval', function($scope, $interval){
    var startTime = 0,
        currentTime = null,
        offset = 0,
        running = false,
        interval = null;
    
    if(!$scope.options.interval){
        $scope.options.interval = 100;
    }

    $scope.options.elapsedTime = new Date(0);
    
    function pushToLog(lap){
        if($scope.options.log !== undefined){
           $scope.options.log.push(lap); 
        }
    }
     
    function updateTime(){
        currentTime = new Date().getTime();
        var timeElapsed = offset + (currentTime - startTime);
        $scope.options.elapsedTime.setTime(timeElapsed);
    }

    this.startTimer = $scope.startTimer = function(){
        if(running === false){
            startTime = new Date().getTime();
            interval = $interval(updateTime,$scope.options.interval);
            running = true;
        }
    };

    this.stopTimer = $scope.stopTimer = function(){
        if( running === false) {
            return;
        }
        updateTime();
        offset = offset + currentTime - startTime;
        pushToLog(currentTime - startTime);
        $interval.cancel(interval);  
        running = false;
    };

    this.resetTimer = $scope.resetTimer = function(){
      startTime = new Date().getTime();
      $scope.options.elapsedTime.setTime(0);
      timeElapsed = offset = 0;
    };

}])
.directive('stopWatch', ['$interval', function($interval){
    return {
        restrict: 'EA',
        scope: {options: '='},
        replace: true,
        controller: 'stopWatchCtrl',
        templateUrl: 'directives/StopWatch/stopWatch.tpl.html',
        compile: function(tElem, tAttrs){
            
            if (!tAttrs.options){
                 throw new Error('Must Pass an options object from the Controller For the StopWatch to Work Correctly.');
            }
            
            return function(scope, elem, attrs){    
              scope.startTimer();              
            };
        }
    };
}])
.filter('stopWatchTime', function () {
    return function (input) {
        if(input){
            
            var elapsed = input.getTime();
            var hours = parseInt(elapsed / 360000,10);
            elapsed %= 360000;
            var mins = parseInt(elapsed / 60000,10);
            elapsed %= 60000;
            var secs = parseInt(elapsed / 1000,10);
            var ms = elapsed % 1000;
            
            return hours + ':' + mins + ':' + secs + ':' + ms;
        }
    };
});