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