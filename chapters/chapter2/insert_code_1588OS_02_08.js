stopwatch.factory('StopwatchFactory', ['$interval',
  function($interval){
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

    return self;
  };
}]);