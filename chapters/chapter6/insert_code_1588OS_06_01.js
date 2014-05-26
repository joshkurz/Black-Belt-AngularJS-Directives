app.service('phoneService', function($http, $q) {

    this.getPhones = function() {
       var request = $http.get('phones.json'),
           promise;
           
       promise = request.then(function(response) {
          return response.data;
       },function(errorResponse){
          return errorResponse;
       });
       
       return promise;
    } 


});