app.service('phoneService', function($http, $q) {

    this.getPhones = function() {
       var deferred = $q.defer();
       $http.get('phones.json').success(function(data) {
          deferred.resolve(data);
       }).error(function(error){
          deferred.reject(error);
       });
       return deferred.promise;
    }

});