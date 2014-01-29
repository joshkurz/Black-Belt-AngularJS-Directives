angular.module("directives/demo/flowplayer/flowplayerDemo.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/demo/flowplayer/flowplayerDemo.tpl.html",
    "<div class=\"jumbotron\">\n" +
    "  <label>Flowplayer</label>\n" +
    "  <div ng-if=\"buttonText == 'Playlist Player'\" class=\"alert\">Select the Dots to change the Video.</div>\n" +
    "  <div class=\"btn-group\">\n" +
    "    <div class=\"btn btn-primary\" ng-class=\"{'active': currentFlowplayer == 'directives/mediaPlayer/pureHtml5Player.tpl.html'}\" ng-click=\"changeFlowPlayer('directives/mediaPlayer/pureHtml5Player.tpl.html')\">Pure HTML 5</div>\n" +
    "    <div class=\"btn btn-primary\" ng-class=\"{'active': currentFlowplayer == 'directives/mediaPlayer/flowplayer.tpl.html'}\" ng-click=\"changeFlowPlayer('directives/mediaPlayer/flowplayer.tpl.html')\">Pre-Roll</div>\n" +
    "    <div class=\"btn btn-primary\" ng-class=\"{'active': currentFlowplayer == 'directives/mediaPlayer/flowplayerSlideshow.tpl.html'}\" ng-click=\"changeFlowPlayer('directives/mediaPlayer/flowplayerSlideshow.tpl.html')\">Playlist</div>\n" +
    "  </div>\n" +
    "  <div media-player media-type=\"{{mediaType}}\" video-config=\"activeVideo\" template-url=\"{{currentFlowplayer}}\"></div>\n" +
    "  <div ng-if=\"currentFlowplayer != 'directives/mediaPlayer/flowplayer.tpl.html'\"  class=\"alert\">Playlists\n" +
    "    <div class=\"btn-group\">\n" +
    "      <button ng-repeat=\"video in videos\" class=\"btn\" ng-click=\"setActiveVideo($index)\">{{$index+1}}</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
