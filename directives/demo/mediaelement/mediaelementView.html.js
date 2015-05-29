angular.module("directives/demo/mediaelement/mediaelementView.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/demo/mediaelement/mediaelementView.tpl.html",
    "<div class=\"well jumbotron container\">\n" +
    "  <div class=\"bs-callout bs-callout-info alignTextLeft\">\n" +
    "    <span>\n" +
    "        <h1>Mediaelement</h1>\n" +
    "    </span>\n" +
    "    <a href=\"http://mediaelementjs.com/\">mediaelement.js</a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-lg-6 alignTextLeft\">\n" +
    "      <p>Type into the search box you will see YouTube statistics of views alongside of the search result</p>\n" +
    "      <label for=\"youtubeSearch\">Search YouTube</label>\n" +
    "      <input type=\"text\" name=\"youtubeSearch\" ng-model=\"result\" typeahead=\"suggestion as suggestion.snippet.title for suggestion in videoSearch($viewValue)\">\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"col-lg-6 alignTextLeft\">\n" +
    "      <p>Enter any valid RTMP stream here and hit play. Then sit back and enjoy your live stream. Currently it's set on the default Cash Money Stream. Cash Money is the turtles name.</p>\n" +
    "      <div class=\"btn btn-primary\" ng-click=\"watchRtmp()\">Watch RTMP</div>\n" +
    "      <label for=\"RTMPsrc\">Live Stream Custom RTMP</label>\n" +
    "      <input type=\"text\" name=\"RTMPsrc\" ng-model=\"activeVideo.src\" placeholder=\"Enter an RTMP Stream\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <hr>\n" +
    "\n" +
    "  <label>{{activeVideo.title}}</label>\n" +
    "  <div bb-media-player media-type=\"mediaelementplayer\" video-config=\"activeVideo\" template-url=\"{{currentMediaPlayer}}\"></div>\n" +
    "  <div class=\"alert\">Suggested</div>\n" +
    "  <div class=\"btn-group\">\n" +
    "    <div ng-repeat=\"video in videos\" class=\"btn\">\n" +
    "      <img ng-click=\"setActiveVideo($index)\" class=\"thumbnail videoThumbnail\" ng-src=\"{{video.thumbnail}}\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
