describe('flowplayer', function () {
  'use strict';

  var scope, $compile;

  beforeEach(module('AngularBlackBelt.flowplayer'));
  
  beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_,_$interval_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;

    scope.goodVideoObj = {
        src: 'path/to/vide.mp4',
        thmubnail: 'pic.jpg'
    };

    scope.badVideoObj = 'notAobject';


  }));

  describe('Creating A flowplayer Directive', function () {

    it('throw an error if there is no videoConfig set on the element', function() {
      expect(function(){
        var flowplayer = $compile('<div flowplayer></div>')(scope);
        scope.$apply();
      }).toThrow('videoConfig must be an object');
    });   

    it('throw an error if videoConfig is not an object', function() {
      expect(function(){
        var flowplayer = $compile('<div flowplayer video-config="badVideoObj"></div>')(scope);
        scope.$apply();
      }).toThrow('videoConfig must be an object');
    });   

    it('do not throw an error when creating the directive with a good videoConfig', function() {
      expect(function(){
        var flowplayer = $compile('<div flowplayer video-config="goodVideoObj"></div>')(scope);
        scope.$apply();
      }).not.toThrow();
    });  

  });

});