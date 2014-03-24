angular.module("directives/demo/stopLight/stopLightView.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/demo/stopLight/stopLightView.tpl.html",
    "<div class=\"jumbotron\">\n" +
    "\n" +
    "   <div class=\"alert alert-success\">When the light turns Green. Its on.</div>\n" +
    "\n" +
    "   <div stop-light-container options=\"fastClickState\" class=\"trafficlight\">\n" +
    "    <canvas class=\"light\" stop-light state=\"red\"></canvas>\n" +
    "    <canvas class=\"light\" stop-light state=\"yellow\"></canvas>\n" +
    "    <canvas class=\"light\" stop-light state=\"green\"></canvas>\n" +
    "    <fast-clicker options=\"stopwatch\" bb-stopwatch></fast-clicker>\n" +
    "   </div>\n" +
    "   \n" +
    "   <!-- <div ng-if=\"stopwatch.log[stopwatch.log.length-1]\">\n" +
    "     <div was-fast time=\"stopwatch.log[stopwatch.log.length-1]\"></div>\n" +
    "     <div class=\"fastRunner\" fast-runner time=\"stopwatch.log[stopwatch.log.length-1]\" pics=\"pics\"></div>\n" +
    "   </div> -->\n" +
    "\n" +
    "   <div class=\"log\" ng-repeat=\"log in stopwatch.log\">\n" +
    "     <div was-fast time=\"log\"></div>\n" +
    "     <div class=\"fastRunner\" fast-runner time=\"log\" pics=\"pics\"></div>\n" +
    "   </div>\n" +
    "</div>\n" +
    "    ");
}]);
