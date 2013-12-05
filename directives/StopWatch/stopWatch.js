angular.module('stopWatchApp', [])
.controller('stopWatchCtrl', ['$scope', function($scope){
    $scope.stopWatches = [{interval: 100, elapsedTime: null},{interval: 1000, elapsedTime: null},{interval: 200, elapsedTime: null}];
}])
.directive('stopWatch', ['$interval', function($interval){
    return {
        restrict: 'EA',
        scope: {options: '='},
        replace: true,
        templateUrl: 'stopWatch.tpl.html',
        link: function(scope, elem, attrs){
            
            var startTime = new Date().getTime(),
                timeElapsed = 0,
                interval = null;
            
            scope.options.elapsedTime = new Date();
            scope.options.elapsedTime.setTime(0);
            
            function updateTime(){
                timeElapsed = timeElapsed + scope.options.interval;
                scope.options.elapsedTime.setTime(timeElapsed);
            };

            scope.startTimer = function(){
                interval = $interval(updateTime,scope.options.interval);
            };
            
            scope.stopTimer = function(){
              $interval.cancel(interval);  
            };
            
            scope.resetTimer = function(){
              scope.options.elapsedTime.setTime(0);
              timeElapsed = 0;
            };
            
            scope.startTimer();
        }
    }
}])
.filter('stopWatchTime', function () {
    return function (input) {
        if(input){
            
            var elapsed = input.getTime();
            var hours = parseInt(elapsed / 360000);
            elapsed %= 360000;
            var mins = parseInt(elapsed / 60000);
            elapsed %= 60000;
            var secs = parseInt(elapsed / 1000);
            var ms = elapsed % 1000;
            
            return hours + ':' + mins + ':' + secs + ':' + ms
        }
    };
});