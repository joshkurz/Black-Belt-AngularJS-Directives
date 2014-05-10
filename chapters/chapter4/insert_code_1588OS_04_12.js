<div class="pureHTML5Player">
  <video autoplay>
    <source type="video/mp4" ng-src="{{trustSrc(videoConfig.playlist[0], '.mp4')}}">
    <source type="video/ogg" ng-src="{{trustSrc(videoConfig.playlist[0], '.ogv')}}">
  </video>
</div>