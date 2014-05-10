describe('mediaPlayer', function () {
  'use strict';

  var scope, $compile, $timeout;

  beforeEach(module('AngularBlackBelt.mediaPlayer', 'directives/mediaPlayer/pureHtml5Player.tpl.html', 'directives/mediaPlayer/flowplayer.tpl.html', 'directives/mediaelement/mediaelement.tpl.html'));
  
  beforeEach(inject(function (_$rootScope_, _$compile_,_$timeout_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $timeout = _$timeout_;

    scope.goodVideoObj = {
        src: 'directives/mediaPlayer/flowplayer.tpl.html',
        thmubnail: 'pic.jpg'
    };

    scope.badVideoObj = 'notAobject';


  }));

  describe('Creating A mediaPlayer Directive', function () {

    it('should throw an error if there is no templateUrl  set on the element', function() {
      expect(function(){
        var mediaPlayer = $compile('<div bb-media-player></div>')(scope);
        scope.$apply();
      }).toThrow('Must Give bb-media-player a templateUrl to look for.');
    });   

    it('should throw an error if temp is not an object', function() {
      expect(function(){
        var mediaPlayer = $compile('<div bb-media-player video-config="badVideoObj" template-url="directives/mediaPlayer/flowplayer.tpl.html"></div>')(scope);
        scope.$apply();
      }).toThrow('videoConfig must be an object');
    });   

    it('should not throw an error when creating the directive with a good videoConfig', function() {
      expect(function(){
        var mediaPlayer = $compile('<div bb-media-player video-config="goodVideoObj" template-url="directives/mediaPlayer/flowplayer.tpl.html"></div>')(scope);
        scope.$apply();
        $timeout.flush();
      }).not.toThrow();
    });  

     it('should create a flowplayer object and call the flowplayer method with the correct options', function() {
        spyOn($.fn,'flowplayer');
        var mediaPlayer = $compile('<div bb-media-player media-type="flowplayer" video-config="goodVideoObj" template-url="directives/mediaPlayer/flowplayer.tpl.html"></div>')(scope);
        scope.$apply();
        $timeout.flush();
        expect($.fn.flowplayer.callCount).toBe(1);
        expect($.fn.flowplayer.mostRecentCall.args[0]).toBe(scope.goodvideoObj);
    });  

    it('should create a mediaelement object and call the mediaelementplayer method with the correct options', function() {
        spyOn($.fn, 'mediaelementplayer');
        var mediaPlayer = $compile('<div bb-media-player media-type="mediaelementplayer" video-config="goodVideoObj" template-url="directives/mediaelement/mediaelement.tpl.html"></div>')(scope);
        scope.$apply();
        $timeout.flush();
        expect($.fn.mediaelementplayer.callCount).toBe(1);
        expect($.fn.mediaelementplayer.mostRecentCall.args[0]).toBe(scope.goodvideoObj);
    }); 

    it('should create a mediaelement object when media-type and template url are interpolated strings and call the mediaelement method with the correct options', function() {
        spyOn($.fn, 'mediaelementplayer');
        scope.mediaType = "mediaelementplayer";
        scope.template = "directives/mediaelement/mediaelement.tpl.html";
        scope.$apply();
        var mediaPlayer = $compile('<div bb-media-player media-type="{{mediaType}}" video-config="goodVideoObj" template-url="{{template}}"></div>')(scope);
        scope.$apply();
        $timeout.flush();
        expect($.fn.mediaelementplayer.callCount).toBe(1);
        expect($.fn.mediaelementplayer.mostRecentCall.args[0]).toBe(scope.goodvideoObj);
    }); 

    it('should create a flowplayer object when media-type and template url are interpolated string and call the flowplayer method with the correct options', function() {
        spyOn($.fn, 'flowplayer');
        scope.mediaType = "flowplayer";
        scope.template = "directives/mediaPlayer/flowplayer.tpl.html";
        scope.$apply();
        var mediaPlayer = $compile('<div bb-media-player media-type="{{mediaType}}" video-config="goodVideoObj" template-url="{{template}}"></div>')(scope);
        scope.$apply();
        $timeout.flush();
        expect($.fn.flowplayer.callCount).toBe(1);
        expect($.fn.flowplayer.mostRecentCall.args[0]).toBe(scope.goodvideoObj);
    });     

    it('should create a pure HTML5 media element', function() {
       expect(function(){
        var mediaPlayer = $compile('<div bb-media-player video-config="goodVideoObj" template-url="directives/mediaPlayer/pureHtml5Player.tpl.html"></div>')(scope);
        scope.$apply();
        $timeout.flush();
      }).not.toThrow();
    });

    it('should create a pure HTML5 media element with an empty media type and an interpolated template', function() {
       expect(function(){
        scope.template = "directives/mediaPlayer/pureHtml5Player.tpl.html";
        var mediaPlayer = $compile('<div bb-media-player="" video-config="goodVideoObj" template-url="{{template}}"></div>')(scope);
        scope.$apply();
        $timeout.flush();
      }).not.toThrow();
    });     

  });

});