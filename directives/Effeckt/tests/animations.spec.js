describe('Animation Tests', function () {
  'use strict';

  var scope, $compile, $animate;

  beforeEach(module('bbEffecktListModule'));
  beforeEach(inject(function (_$rootScope_, _$compile_, _$animate_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $animate = _$animate_;

    scope.superheroes = [{
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
  }));

  describe('Scrolling the EffecktDirective', function () {
      
      var effecktNode, scrollEvent;
      beforeEach(function(){
        scrollEvent = new Event('scroll');
        effecktNode = $compile('<ul style="height: 10px; overflow: hidden;" class="effeckt-list-scroll" bb-custom-effeckt-list>' +
            '<li class="effeckt-list-item" ng-repeat="superhero in superheroes track by $index">{{superhero.name}}</li>' +
            '</ul>')(scope);
        spyOn($animate, 'addClass');
        scope.$apply();
      });

      it('should call the addClass method when the element is scrolled', function(){
        effecktNode[0].dispatchEvent(scrollEvent);
        expect($animate.addClass.callCount).toBe(5);
        expect($animate.addClass.mostRecentCall.args[1]).toBe('past');
      });


  });

});