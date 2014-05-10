it('should create a pure HTML5 media element', function() {
   expect(function(){
    var mediaPlayer = $compile('<div bb-media-player video-config="goodVideoObj" template-url="directives/mediaPlayer/pureHtml5Player.tpl.html"></div>')(scope);
    scope.$apply();
    $timeout.flush();
  }).not.toThrow();
});