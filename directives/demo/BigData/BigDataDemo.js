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
     var removedTicker = $scope.tickers.splice(index,1);
     pubnubService.unsubscribeToTicker(removedTicker);
     $scope.addTickers.push(removedTicker[0]);
   };

   $scope.addTicker = function(index){
     var tickValue = $scope.addTickers.splice(index,1);
     $scope.tickers.push(tickValue[0]);
     pubnubService.subscribeToTicker(tickValue);
   }

   $scope.$on('$destroy', function(event){
    for(var tic in $scope.tickers){
       pubnubService.unsubscribeToTicker($scope.tickers[tic]);
     };
   });

}])
.service('pubnubService', ['$timeout', function($timeout){
  
  var self = this;

  self.pubnub = PUBNUB.init({
      subscribe_key : 'demo',
      publish_key   : 'demo'
  });

  self.pubnubStockData = {};

  self.subscribeToTicker = function(ticker){

    function receiver(update,data){
      $timeout(function(){
          self.pubnubStockData[ticker] = update; 
       });
    }

    self.pubnub.subscribe({
      channel : ticker,
      message : receiver
    });
  };

  self.unsubscribeToTicker = function(ticker){

    delete self.pubnubStockData[ticker];
    self.pubnub.unsubscribe({channel: ticker});

  }

}]);