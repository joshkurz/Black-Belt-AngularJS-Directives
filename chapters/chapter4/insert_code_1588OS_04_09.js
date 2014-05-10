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