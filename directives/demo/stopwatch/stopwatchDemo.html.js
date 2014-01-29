angular.module("directives/demo/stopwatch/stopwatchDemo.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/demo/stopwatch/stopwatchDemo.tpl.html",
    "<div class=\"jumbotron\">\n" +
    "  <div ng-repeat=\"options in stopwatches\">\n" +
    "    <div stopwatch options=\"options\" override=\"true\">\n" +
    "        <div class=\"container\">\n" +
    "          <div class=\"stopwatch numbers\">\n" +
    "            {{options.elapsedTime | stopwatchTime}}\n" +
    "           </div>\n" +
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
