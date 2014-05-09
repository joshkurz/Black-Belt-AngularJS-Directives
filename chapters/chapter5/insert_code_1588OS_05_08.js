//updated integrated view
<div class="log" ng-repeat="log in stopwatch.log">
  <div was-fast time="log"></div>
  <div class="fastRunner" fast-runner time="log" pics="pics"></div>
</div>

//updated wasFast directive
scope: {time : '='},
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
  scope.$watch('time',changeMethod);
}

//updated fastRunner directive
scope: {time: '=', pics: '='},
template: '<marquee behavior="scroll" scrollamount="{{runnerSpeed}}" direction="right"><img ngsrc="{{pics[runnerSpeed]}}"/></marquee>',
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