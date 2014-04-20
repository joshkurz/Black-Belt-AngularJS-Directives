angular.module("directives/demo/flowplayer/flowplayerDemo.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/demo/flowplayer/flowplayerDemo.tpl.html",
    "<div class=\"well jumbotron container\">\n" +
    "  <div class=\"bs-callout bs-callout-info alignTextLeft\">\n" +
    "    <span>\n" +
    "        <h1>Flowplayer</h1>\n" +
    "    </span>\n" +
    "    <p>The flowplayer demo shows how important the $compile service can be to a directive.</p>\n" +
    "    <p>All of the different types of flowplayers that are available here are being created by the same directive.<p>\n" +
    "  </div>\n" +
    "  <div ng-if=\"buttonText == 'Playlist Player'\" class=\"alert\">Select the Dots to change the Video.</div>\n" +
    "  <div class=\"btn-group offsetTop\">\n" +
    "    <div class=\"btn btn-default\" ng-class=\"{'active': currentFlowplayer == 'directives/mediaPlayer/pureHtml5Player.tpl.html'}\" ng-click=\"changeFlowPlayer('directives/mediaPlayer/pureHtml5Player.tpl.html')\">Pure HTML 5</div>\n" +
    "    <div class=\"btn btn-default\" ng-class=\"{'active': currentFlowplayer == 'directives/mediaPlayer/flowplayer.tpl.html'}\" ng-click=\"changeFlowPlayer('directives/mediaPlayer/flowplayer.tpl.html')\">Pre-Roll</div>\n" +
    "    <div class=\"btn btn-default\" ng-class=\"{'active': currentFlowplayer == 'directives/mediaPlayer/flowplayerSlideshow.tpl.html'}\" ng-click=\"changeFlowPlayer('directives/mediaPlayer/flowplayerSlideshow.tpl.html')\">Playlist</div>\n" +
    "  </div>\n" +
    "  <div class=\"offsetTop\" media-player media-type=\"{{mediaType}}\" video-config=\"activeVideo\" template-url=\"{{currentFlowplayer}}\"></div>\n" +
    "  <div ng-if=\"currentFlowplayer != 'directives/mediaPlayer/flowplayer.tpl.html'\"  class=\"alert\">Playlists\n" +
    "    <div class=\"btn-group\">\n" +
    "      <button ng-repeat=\"video in videos\" class=\"btn\" ng-click=\"setActiveVideo($index)\">{{$index+1}}</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
