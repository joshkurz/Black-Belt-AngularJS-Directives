angular.module('demoApp', ['StopWatch'])
.controller('demoCtrl', ['$scope', function($scope){
    $scope.stopWatches = [{interval: 100, log: []},{interval: 1000, log: []},{interval: 200, log: []}];
}]);