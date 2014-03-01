var app = angular.module('AngularBlackBelt.demo/animations', ['ngAnimate'])
    .controller('animationsCtrl', ['$scope', function ($scope) {

    $scope.players = [{
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
        "power": ["force", "lightsaber"]
    }];

    for (var i = 0; i < 100; i++) {
        $scope.players.push({
            "name": "Yoda",
            "power": ["force", "lightsaber"]
        });
    }

}]);