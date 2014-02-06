angular.module('AngularBlackBelt.demo/BigData', ['directives/demo/BigData/bigDataView.tpl.html'])
.controller('BigDataCtrl', ['$scope', '$timeout', 'pubnubService', function($scope, $timeout, pubnubService){
   
   var pubnub = pubnubService.pubnub;

   function receiver(update) { 
     $timeout(function(){
       $scope.stockData = update; 
     });
   }

   pubnub.subscribe({
            channel : ['ORCL', 'ZNGA'],
            message : receiver
   });

}])
.service('pubnubService', function(){
  
  this.pubnub = PUBNUB.init({
      subscribe_key : 'demo',
      publish_key   : 'demo'
  });

});