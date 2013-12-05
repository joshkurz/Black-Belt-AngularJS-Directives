angular.module('demoApp', ['stopWatchApp'])
.controller('demoCtrl', ['$scope', function($scope){
    $scope.stopWatches = [{interval: 100, elapsedTime: null},{interval: 1000, elapsedTime: null},{interval: 200, elapsedTime: null}];
}]);