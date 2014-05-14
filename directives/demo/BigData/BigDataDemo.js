/*jshint -W083 */
angular.module('AngularBlackBelt.demo/BigData', ['directives/demo/BigData/stockchartView.tpl.html'])
.controller('BigDataCtrl', ['$scope', 'pubnubService', function($scope, pubnubService){
   
   $scope.tickers = ['ORCL', 'ZNGA', 'EA', 'F', 'FB' , 'TRI'];
   $scope.addTickers = ['GOOG'];
   $scope.newTicker = "";
   
   for(var tic in $scope.tickers){
     pubnubService.subscribeToTicker($scope.tickers[tic]);
   }

   $scope.stockData = pubnubService.pubnubStockData;

   $scope.removeTicker = function(index){
     var removedTicker = $scope.tickers.splice(index,1)[0];
     pubnubService.unsubscribeToTicker(removedTicker);
     $scope.addTickers.push(removedTicker);
   };

   $scope.addTicker = function(index){
     var tickValue = $scope.addTickers.splice(index,1);
     $scope.tickers.push(tickValue[0]);
     pubnubService.subscribeToTicker(tickValue);
   };

   $scope.$on('$destroy', function(event){
    for(var tic in $scope.tickers){
       pubnubService.unsubscribeToTicker($scope.tickers[tic]);
     }
   });

}])
.service('pubnubService', ['$rootScope', function($rootScope){
  
  var self = this,
      unsubscribed = {};

  self.pubnub = PUBNUB.init({
      subscribe_key : 'demo',
      publish_key   : 'demo'
  });

  self.pubnubStockData = {};

  self.subscribeToTicker = function(ticker){
    delete unsubscribed[ticker];
    self.pubnub.subscribe({
      channel : ticker,
      message : $.throttle(3000, function(update,data){
        if(!unsubscribed[ticker]){
          $rootScope.$apply(function(){
            self.pubnubStockData[ticker] = update; 
          });
        }
      })
    });
  };

  self.unsubscribeToTicker = function(ticker){
    
      delete self.pubnubStockData[ticker];
      unsubscribed[ticker] = true;
      self.pubnub.unsubscribe({channel: ticker});

  };

}]);




$.throttle = jq_throttle = function( delay, no_trailing, callback, debounce_mode ) {
    // After wrapper has stopped being called, this timeout ensures that
    // `callback` is executed at the proper times in `throttle` and `end`
    // debounce modes.
    var timeout_id,
      
      // Keep track of the last time `callback` was executed.
      last_exec = 0;
    
    // `no_trailing` defaults to falsy.
    if ( typeof no_trailing !== 'boolean' ) {
      debounce_mode = callback;
      callback = no_trailing;
      no_trailing = undefined;
    }
    
    // The `wrapper` function encapsulates all of the throttling / debouncing
    // functionality and when executed will limit the rate at which `callback`
    // is executed.
    function wrapper() {
      var that = this,
        elapsed = +new Date() - last_exec,
        args = arguments;
      
      // Execute `callback` and update the `last_exec` timestamp.
      function exec() {
        last_exec = +new Date();
        callback.apply( that, args );
      }
      
      // If `debounce_mode` is true (at_begin) this is used to clear the flag
      // to allow future `callback` executions.
      function clear() {
        timeout_id = undefined;
      }
      
      if ( debounce_mode && !timeout_id ) {
        // Since `wrapper` is being called for the first time and
        // `debounce_mode` is true (at_begin), execute `callback`.
        exec();
      }
      
      // Clear any existing timeout.
      timeout_id && clearTimeout( timeout_id );
      
      if ( debounce_mode === undefined && elapsed > delay ) {
        // In throttle mode, if `delay` time has been exceeded, execute
        // `callback`.
        exec();
        
      } else if ( no_trailing !== true ) {
        // In trailing throttle mode, since `delay` time has not been
        // exceeded, schedule `callback` to execute `delay` ms after most
        // recent execution.
        // 
        // If `debounce_mode` is true (at_begin), schedule `clear` to execute
        // after `delay` ms.
        // 
        // If `debounce_mode` is false (at end), schedule `callback` to
        // execute after `delay` ms.
        timeout_id = setTimeout( debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay );
      }
    }
    
    // Set the guid of `wrapper` function to the same of original callback, so
    // it can be removed in jQuery 1.4+ .unbind or .die by using the original
    // callback as a reference.
    if ( $.guid ) {
      wrapper.guid = callback.guid = callback.guid || $.guid++;
    }
    
    // Return the wrapper function.
    return wrapper;
  };