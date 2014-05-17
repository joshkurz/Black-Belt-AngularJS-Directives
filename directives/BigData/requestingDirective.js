//http://plnkr.co/edit/f4ZDCyOcud5WSEe9L0GO?p=preview
//advanced http://plnkr.co/edit/TFnNrN938vpMoSoVbE79?p=preview
var app = angular.module('angularjs-promise-example', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider.when('/', {
    controller: 'PhoneListCtrl',
    templateUrl: 'phoneList.tpl.html',
    resolve: {
      phones: function(phoneService){
        return phoneService.getPhones();
      }
    }
  }).otherwise({ redirectTo: '/' });
});

app.controller('PhoneListCtrl', function($scope, phones) {
  
  $scope.phones = phones;
  
});

app.service('phoneService', function($http, $q) {
    
    //used when resolving data in the routeConfig
    this.getPhones = function() {
       var deferred = $q.defer();
       $http.get('phones.json').success(function(data) {
          deferred.resolve(data);
       }).error(function(error){
          deferred.reject(error);
       });
       return deferred.promise;
    };

    this.getPhone = function(config) {
       return $http.get(config.url);
    };

});


app.directive('bbPhoneDetails', ['phoneService', function(phoneService){

    function link(scope,element,attrs,controller){
      
      scope.phone = {};
      scope.$watch('config', function(config){
        phoneService.getPhone(config).success(function(data) {
          scope.phone.details = data.snippet;
       }).error(function(){
          scope.phone.details = 'error: no file exists';
       });
      },true); 
       
    }
    
    return {
        restrict: 'A',
        templateUrl: 'phoneDetails.tpl.html',
        scope: {config: '='},
        link: link
    };
    
}]);


// version 1
// var app = angular.module('angularjs-promise', ['ngRoute']);

// app.config(function($routeProvider){
//   $routeProvider.when('/', {
//     controller: 'PhoneListCtrl',
//     templateUrl: 'phoneList.tpl.html',
//     resolve: {
//       phones: function(phoneService){
//         return phoneService.getPhones();
//       }
//     }
//   }).otherwise({ redirectTo: '/' });
// })

// app.controller('PhoneListCtrl', function($scope, phones) {
  
//   $scope.phones = phones;
  
// });

// app.service('phoneService', function($http, $q) {

//     this.getPhones = function() {
//        var deferred = $q.defer();
//        $http.get('phones.json').success(function(data) {
//           deferred.resolve(data);
//        }).error(function(error){
//           deferred.reject(error);
//        });
//        return deferred.promise;
//     }

// });



