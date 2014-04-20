/*jshint -W083 */
angular.module('AngularBlackBelt.demo/BigData', ['directives/demo/BigData/bigDataView.tpl.html'])
.controller('BigDataCtrl', ['$scope', 'pubnubService', function($scope, pubnubService){
   
   $scope.tickers = ['ORCL', 'ZNGA', 'EA', 'F', 'FB' , 'TRI'];
   $scope.newTicker = "";
   
   for(var tic in $scope.tickers){
     pubnubService.subscribeToTicker($scope.tickers[tic]);
   }

   $scope.stockData = pubnubService.pubnubStockData;

   $scope.removeTicker = function(index){
     var removedTicker = $scope.tickers.splice(index,1);
     pubnubService.unsubscribeToTicker(removedTicker);
   };

   $scope.addTicker = function(){
     var upperCaseTicker = $scope.newTicker.toUpperCase();
     $scope.tickers.push(upperCaseTicker);
     pubnubService.subscribeToTicker(upperCaseTicker);
     $scope.newTicker = "";
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