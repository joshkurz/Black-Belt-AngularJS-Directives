describe('StopLight', function () {
  'use strict';

  var scope, $compile, $locale, ctrl, svgService;

  beforeEach(module('AngularBlackBelt.StopLight'));
  beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_,_$interval_,_svgService_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    svgService = _svgService_;
    scope.options = {
        lineWidth: 6,
        strokeStyle: '#003300',
        radius: 30,
        state: 'green'
    };
    ctrl = _$controller_('stopLightCtrl', {$scope:  scope, $interval: _$interval_});
    scope.$apply();
  }));

  describe('Creating A StopLightContainer Directive with multiple stop lights', function () {
    it('throw an error if the element is not a Canvas Element', function() {
      expect(function(){
        var stopLight = $compile('<div stop-light-container options="options">' +
                                 '<div stop-light></div>' +
                                 '</div>')(scope);
        scope.$apply();
      }).toThrow('StopLight can only be a canvas element. DIV will not work.');
    });    
    it('not throw an error when initializing on a Canvas Element', function() {
      expect(function(){
        var stopLight = $compile('<div stop-light-container options="options">' +
                                   '<canvas stop-light></canvas>' +
                                   '<canvas stop-light></canvas>' +
                                   '<canvas stop-light></canvas>' +
                                 '</div>')(scope);
        scope.$apply();
      }).not.toThrow();
    });   
    it('The original state should be green and after 6 seconds it should cycle through yellow and red', function() {
        var stopLight = $compile('<div stop-light-container options="options">' +
                                   '<canvas stop-light></canvas>' +
                                   '<canvas stop-light></canvas>' +
                                   '<canvas stop-light></canvas>' +
                                 '</div>')(scope);
        scope.$apply();
        expect(ctrl.options.state).toBe('green');
        ctrl.setNextState();
        scope.$apply();
        expect(ctrl.options.state).toBe('yellow');
        ctrl.setNextState();
        scope.$apply();
        expect(ctrl.options.state).toBe('red');
    });
    it('Every stop light should be grey because the state was not set as a default', function() {
        var stopLight = $compile('<div stop-light-container options="options">' +
                                   '<canvas stop-light></canvas>' +
                                   '<canvas stop-light></canvas>' +
                                   '<canvas stop-light></canvas>' +
                                 '</div>')(scope);
        scope.$apply();
        var svg = stopLight.children()[0].getContext("2d");
        expect(svg.fillStyle).toBe('#cccccc');
        var svg1 = stopLight.children()[1].getContext("2d");
        expect(svg.fillStyle).toBe('#cccccc');
        var svg2 = stopLight.children()[2].getContext("2d");
        expect(svg.fillStyle).toBe('#cccccc');
    });
    it('Each stop light should be what the default state is set as and the last element should be set as green', function() {
        var stopLight = $compile('<div stop-light-container options="options">' +
                                   '<canvas stop-light state="red"></canvas>' +
                                   '<canvas stop-light state="yellow"></canvas>' +
                                   '<canvas stop-light state="green"></canvas>' +
                                 '</div>')(scope);
        scope.$apply();
        var svg = stopLight.children()[0].getContext("2d");
        expect(svg.fillStyle).toBe('#cccccc');
        var svg1 = stopLight.children()[1].getContext("2d");
        expect(svg1.fillStyle).toBe('#cccccc');
        var svg2 = stopLight.children()[2].getContext("2d");
        expect(svg2.fillStyle).toBe('#008000');
    });
    it('Each stop light should be what the default state is set as and the last element should be set as green', function() {
        var stopLight = $compile('<div stop-light-container options="options">' +
                                   '<canvas stop-light state="red"></canvas>' +
                                   '<canvas stop-light state="yellow"></canvas>' +
                                   '<canvas stop-light state="green"></canvas>' +
                                 '</div>')(scope);
        scope.$apply();
        var svg = stopLight.children()[1].getContext("2d");
        ctrl.setNextState();
        scope.$apply();
        svgService.changeColor(svg,'yellow',ctrl.options.state);
        expect(svg.fillStyle).toBe('#ffff00');
    });
  });

});
