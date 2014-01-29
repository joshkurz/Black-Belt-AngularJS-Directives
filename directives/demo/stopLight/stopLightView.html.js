angular.module("directives/demo/stopLight/stopLightView.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/demo/stopLight/stopLightView.tpl.html",
    "<div class=\"jumbotron\">\n" +
    "\n" +
    "   <!-- <div stop-light-container options=\"state\" class=\"trafficlight\" ng-repeat=\"state in states\">\n" +
    "    <canvas class=\"light\" stop-light state=\"red\"></canvas>\n" +
    "    <canvas class=\"light\" stop-light state=\"yellow\"></canvas>\n" +
    "    <canvas class=\"light\" stop-light state=\"green\"></canvas>\n" +
    "    <button class=\"btn\" ng-click=\"resetState(state)\">Reset!!!</button> \n" +
    "   </div> -->\n" +
    "\n" +
    "   <div class=\"alert alert-success\">When the light turns Green. Its on.</div>\n" +
    "\n" +
    "   <div stop-light-container options=\"fastClickState\" class=\"trafficlight\">\n" +
    "    <canvas class=\"light\" stop-light state=\"red\"></canvas>\n" +
    "    <canvas class=\"light\" stop-light state=\"yellow\"></canvas>\n" +
    "    <canvas class=\"light\" stop-light state=\"green\"></canvas>\n" +
    "    <fast-clicker options=\"stopwatch\" stopwatch></fast-clicker>\n" +
    "   </div>\n" +
    "\n" +
    "   <div class=\"log\" ng-repeat=\"log in stopwatch.log\">\n" +
    "     <div was-fast time=\"log\"></div>\n" +
    "   </div>\n" +
    "</div>\n" +
    "    ");
}]);
