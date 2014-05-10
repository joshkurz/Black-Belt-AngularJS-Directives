angular.module("directives/demo/mediaelement/mediaelementView.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/demo/mediaelement/mediaelementView.tpl.html",
    "<div class=\"well jumbotron container\">\n" +
    "  <div class=\"bs-callout bs-callout-info alignTextLeft\">\n" +
    "    <span>\n" +
    "        <h1>Mediaelement</h1>\n" +
    "    </span>\n" +
    "    <a href=\"http://mediaelementjs.com/\">mediaelement.js</a>\n" +
    "    <p>This media-player directive is using a YouTube mediaelement template, that allows the video player to play YouTube videos. \n" +
    "       If you type into the search box you will see YouTube statistics of views alongside of the search result</p>\n" +
    "  </div>\n" +
    "  <div class=\"alert alert-warning alignTextLeft\">\n" +
    "    <label for=\"youtubeSearch\">Search YouTube</label>\n" +
    "    <input type=\"text\" name=\"youtubeSearch\" ng-model=\"result\" typeahead=\"suggestion as suggestion.title.$t for suggestion in videoSearch($viewValue)\">\n" +
    "  </div>\n" +
    "  <label>{{activeVideo.title}}</label>\n" +
    "  <div bb-media-player media-type=\"mediaelementplayer\" video-config=\"activeVideo\" template-url=\"{{currentMediaPlayer}}\"></div>\n" +
    "  <div class=\"alert\">Suggested Titles</div>\n" +
    "  <div class=\"btn-group\">\n" +
    "    <div ng-repeat=\"video in videos\" class=\"btn\">\n" +
    "      <img ng-click=\"setActiveVideo($index)\" class=\"thumbnail videoThumbnail\" ng-src=\"{{video.thumbnail}}\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
