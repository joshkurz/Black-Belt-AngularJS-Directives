var app = angular.module('angularjs-promise', []);

app.controller('PhoneListCtrl', function($scope, phoneFactory) {
  phoneFactory.getPhones().then(function(data) {
      $scope.phones = data;
   });
});

app.factory('phoneFactory', function($http, $q) {
   return {
     getPhones: function() {
       var deferred = $q.defer();
       $http.get('phones.json').success(function(data) {
          console.log('success');
          deferred.resolve(data);
       }).error(function(){
          console.log('error');
          deferred.reject();
       });
       return deferred.promise;
     },
     getPhone: function(config) {
       var deferred = $q.defer();
       $http.get(config.url).success(function(data) {
          deferred.resolve(data);
       }).error(function(){
          deferred.reject();
       });
       return deferred.promise;
     }
   };
});


app.controller('requestingCtrl', ['$scope','phoneFactory', function($scope,phoneFactory){

     var self = this;
     
     $scope.phone = {};

     self.requestNewData = function(){
       phoneFactory.getPhone($scope.config).then(function(data) {
          $scope.phone.details = data.snippet;
       },function(error){
         $scope.phone.details = 'error: no file exists';
       });
     };
        
}]);

app.directive('bbPhoneDetails', [ function(){

    function link(scope,element,attrs,controller){

      scope.$watch('config', function(newO,oldO){
        controller.requestNewData();
      },true);
       
    }
    
    return {
        restrict: 'A',
        controller: 'requestingCtrl',
        templateUrl: 'phoneDetails.tpl.html',
        scope: {config: '='},
        link: link
    };
    
}]);