<div media-player media-type="{{mediaType}}" videoconfig="
activeVideo" template-url="{{currentFlowplayer}}"></div>

//Flowplayer template 1
<div id="dots" class="player">
  <video autoplay>
    <source type="video/mp4" ng-src="{{trustSrc(videoConfig.playlist[0], '.mp4')}}">
    <source type="video/ogg" ng-src="{{trustSrc(videoConfig.playlist[0], '.ogv')}}">
  </video>
  <div class="fp-playlist">
    <a ng-repeat="video in videoConfig.playlist" href="{{video}}.mp4" id="dot{{$index}}"></a>
  </div>
</div>

//Flowplayer template 2
<div class="flowplayer">
  <video>
    <source type="video/mp4" src="http://stream.flowplayer.org/download/640x240.mp4">
    <source type="video/webm" src="http://stream.flowplayer.org/download/640x240.webm">
    <source type="video/ogg" src="http://stream.flowplayer.org/download/640x240.ogv">
  </video>
  <div class="fp-playlist">
    <a class="is-advert" href="http://stream.flowplayer.org/download/640x240.mp4"></a>
    <a ng-repeat="video in videoConfig.playlist" href="{{video}}.mp4">Video {{$index + 1}}</a>
  </div>
  <div class="preroll-cover">pre-roll</div>
</div>