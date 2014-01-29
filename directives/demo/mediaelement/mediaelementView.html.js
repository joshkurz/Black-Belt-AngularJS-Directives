angular.module("directives/demo/mediaelement/mediaelementView.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/demo/mediaelement/mediaelementView.tpl.html",
    "<div class=\"jumbotron\">\n" +
    "  <div class=\"alert alert-warning\">\n" +
    "    <label for=\"youtubeSearch\">Search YouTube</label>\n" +
    "    <input type=\"text\" name=\"youtubeSearch\" ng-model=\"result\" typeahead=\"suggestion as suggestion.title.$t for suggestion in videoSearch($viewValue)\">\n" +
    "  </div>\n" +
    "  <label>{{activeVideo.title}}</label>\n" +
    "  <div media-player media-type=\"mediaelementplayer\" video-config=\"activeVideo\" template-url=\"{{currentMediaPlayer}}\"></div>\n" +
    "  <div class=\"alert\">Suggested Titles</div>\n" +
    "  <div class=\"btn-group\">\n" +
    "    <div ng-repeat=\"video in videos\" class=\"btn\">\n" +
    "      <img ng-click=\"setActiveVideo($index)\" class=\"thumbnail videoThumbnail\" ng-src=\"{{video.thumbnail}}\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
