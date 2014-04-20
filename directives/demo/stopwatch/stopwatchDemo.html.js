angular.module("directives/demo/stopwatch/stopwatchDemo.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/demo/stopwatch/stopwatchDemo.tpl.html",
    "<div class=\"well jumbotron container\">\n" +
    "  <div class=\"bs-callout bs-callout-info alignTextLeft\">\n" +
    "    <span>\n" +
    "        <h1>Stopwatch Demo</h1>\n" +
    "    </span>\n" +
    "    <p>These stopwatches are each working off of different configurations. The first stopwatch updates every 100 millisecods. The second updates every 1 second and the third every 2 seconds. These stopwatches are very flexible and can be used in many different ways.</p>\n" +
    "  </div>\n" +
    "  <div ng-repeat=\"options in stopwatches\">\n" +
    "    <div bb-stopwatch options=\"options\" override=\"true\">\n" +
    "        <div class=\"container\">\n" +
    "          <div class=\"stopwatch numbers\">\n" +
    "            {{options.elapsedTime | stopwatchTime}}\n" +
    "          </div>\n" +
    "          <button class=\"btn\" ng-click=\"startTimer()\">Start</button>\n" +
    "          <button class=\"btn\" ng-click=\"stopTimer()\">Stop</button>\n" +
    "          <button class=\"btn\" ng-click=\"resetTimer()\">Reset</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "     <div class=\"log\" ng-repeat=\"log in options.log\">\n" +
    "       {{log/1000}} seconds\n" +
    "     </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "  ");
}]);
