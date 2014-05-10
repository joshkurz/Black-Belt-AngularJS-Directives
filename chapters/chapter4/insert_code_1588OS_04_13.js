<video width="100%" height="100%" preload="none" ng-attr-poster="{{videoConfig.thumbnail}}"
ng-src="{{trustSrc(videoConfig.filePath, '.mp4')}}">
  <source ng-src="{{trustSrc(videoConfig.filePath, '.mp4')}}" type="video/mp4">
  <source ng-src="{{trustSrc(videoConfig.filePath, '.webm')}}" type="video/webm">
  <source ng-src="{{trustSrc(videoConfig.filePath, '.ogv')}}" type="video/ogg">
  <object width="100%" height="100%" type="application/ x-shockwave-flash" data="{{trustSrc(videoConfig.filePath,
'.swf')}}">
    <param name="movie" value="{{trustSrc(videoConfig.filePath,
'.swf')}}">
    <param name="flashvars" value="controls=true&amp;
file={{trustSrc(videoConfig.filePath, '.mp4')}}">
  </object>
</video>