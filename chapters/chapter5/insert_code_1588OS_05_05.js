describe('Integration between the stopwatch and the wasFast directive', function () {
    
    var integration,
        logs,
        stopwatch;

    beforeEach(function(){
      var preCompileElement = angular.element('<div>' +
                               '<div class="stopwatch" options="stopwatch" bb-stopwatch override="true">' +
                                 '<button ng-click="startTimer()">start</button>'+
                                 '<button ng-click="stopTimer()">stop</button>'+
                              '</div>' +
                               '<div class="logs" ng-repeat="log in stopwatch.log">'+
                                 ' <div class="wasFast" was-fast time="log"></div>' +
                                 ' <div class="fastRunner" fast-runner time="log" pics="testPics"></div>' +
                               '</div>' +
                             '</div>');

      integration = $compile(preCompileElement)(scope);
      scope.$apply();
      stopwatch = integration.find('.stopwatch');
    });  

    it('should append a super fast child to the directive', function() {
        logs = integration.find('.logs');
        expect(logs.children().length).toBe(0);
        expect(scope.stopwatch.log.length).toBe(0);
        $(stopwatch.children()[0]).click();
        $(stopwatch.children()[1]).click();
        logs = integration.find('.logs');
        expect(scope.stopwatch.log.length).toBe(1);
        expect(logs.children().eq(0).text().split('(')[1]).toBe('Super Dog Speed)');
    });
});