angular.module('demoApp', ['Stopwatch'])
.controller('demoCtrl', ['$scope', function($scope){
    $scope.stopwatches = [{interval: 100, log: []},{interval: 1000, log: []},{interval: 200, log: []}];
}]);