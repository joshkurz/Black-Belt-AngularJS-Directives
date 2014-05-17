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
})

app.controller('PhoneListCtrl', function($scope, phones) {
  
  $scope.phones = phones;
  
});
