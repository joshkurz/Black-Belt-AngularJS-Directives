describe('Creating A fastClicker directive inside a stopLight directive', function () {
    
  var stopLight,
      fastClicker;

  beforeEach(function(){
    var integration = angular.element('<div bb-stop-light-container options="options">' +
                               '<canvas bb-stop-light></canvas>' +
                               '<canvas bb-stop-light></canvas>' +
                               '<canvas bb-stop-light></canvas>' +
                               '<fast-clicker options="stopwatch" bb-stopwatch></fast-clicker>' +
                             '</div>');
    stopLight = $compile(integration)(scope);
    scope.$apply();
    fastClicker = stopLight.find('fast-clicker');
    ctrl = $controller('bbStopLightCtrl', {$scope:  scope, $interval: $interval});
    scope.$apply();
  });  

  it('should activate its own button', function() {
      var fastClickerChild = fastClicker.children()[0];
      expect(fastClickerChild.hasAttribute("disabled")).toBe(true);
      expect(ctrl.options.state).toBe('red');
      ctrl.setNextState();
      ctrl.setNextState();
      scope.$apply();
      expect(ctrl.options.state).toBe('green');
      expect(fastClickerChild.hasAttribute("disabled")).toBe(false);
  });

  it('should allow for clicking the fast clicker and log the time', function() {
      expect(scope.stopwatch.log.length).toBe(0);
      ctrl.setNextState();
      ctrl.setNextState();
      scope.$apply();
      $(fastClicker.children()[0]).click();
      expect(scope.stopwatch.log.length).toBe(1);
  });
});