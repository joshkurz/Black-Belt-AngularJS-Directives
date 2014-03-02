var app = angular.module('AngularBlackBelt.demo/animations', [])
    .controller('animationsCtrl', ['$scope', function ($scope) {

    $scope.superheroes = [{
        "name": "Johnny Bravo",
        "powers": ["mojo"]
    }, {
        "name": "Superman",
        "powers": ["*"]
    }, {
        "name": "Catwoman",
        "powers": ["climbing", "scratching"]
    }, {
        "name": "Robin",
        "powers": ["sidekicking", "diversions"]
    }, {
        "name": "Yoda",
        "powers": ["force", "lightsaber"]
    }];

    for (var i = 0; i < 100; i++) {
        $scope.superheroes.push(angular.copy($scope.superheroes[Math.floor((Math.random()*5)+1)]));
    }

}]);