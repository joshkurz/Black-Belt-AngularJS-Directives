/*jshint -W083 */
angular.module('AngularBlackBelt.demo/BigData', ['directives/demo/BigData/bigDataView.tpl.html'])
.controller('BigDataCtrl', ['$scope', 'pubnubService', function($scope, pubnubService){
   
   $scope.tickers = ['ORCL', 'ZNGA', 'EA', 'F', 'FB' , 'TRI'];
   
   for(var tic in $scope.tickers){
     pubnubService.subscribeToTicker($scope.tickers[tic]);
   }

   $scope.stockData = pubnubService.pubnubStockData;

}])
.service('pubnubService', ['$timeout', function($timeout){
  
  var self = this;

  self.pubnub = PUBNUB.init({
      subscribe_key : 'demo',
      publish_key   : 'demo'
  });

  self.pubnubStockData = {};

  self.subscribeToTicker = function(ticker){

    function receiver(update){
      $timeout(function(){
          self.pubnubStockData[ticker] = update; 
       });
    }

    self.pubnub.subscribe({
      channel : [ticker],
      message : receiver
    });
  };

}]);