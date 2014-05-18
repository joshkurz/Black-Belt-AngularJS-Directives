angular.module('AngularBlackBelt.demo/BigData',[])
.service('pubnubService', ['$timeout', function($timeout){
  
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
