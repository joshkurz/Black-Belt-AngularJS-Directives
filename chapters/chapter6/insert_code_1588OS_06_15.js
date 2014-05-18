.controller('BigDataCtrl', ['$scope', 'pubnubService',
  function($scope, pubnubService){
  $scope.tickers = ['ORCL', 'ZNGA', 'EA', 'F', 'FB' , 'TRI'];
  for(var tic in $scope.tickers){
    pubnubService.subscribeToTicker($scope.tickers[tic]);
    }
  $scope.stockData = pubnubService.pubnubStockData;
}])
