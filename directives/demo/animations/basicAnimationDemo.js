var app = angular.module('AngularBlackBelt.demo/animations', ['Effects'])
    .controller('animationsCtrl', ['$scope', function ($scope) {

    var superheroes = [{
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

    $scope.superheroes = angular.copy(superheroes);
    $scope.superheroes4 = angular.copy(superheroes);

    for (var i = 0; i < 100; i++) {
        $scope.superheroes.push(angular.copy(superheroes[Math.floor((Math.random()*4))]));
    }

    $scope.superheroes2 = angular.copy($scope.superheroes);
    $scope.superheroes3 = angular.copy($scope.superheroes);

}]);