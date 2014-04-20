angular.module("directives/demo/stopLight/stopLightView.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/demo/stopLight/stopLightView.tpl.html",
    "<div class=\"well jumbotron container\">\n" +
    "   \n" +
    "   <div class=\"bs-callout bs-callout-info alignTextLeft\">\n" +
    "    <span>\n" +
    "        <h1>Stop Light Demo</h1>\n" +
    "    </span>\n" +
    "    <p>This demo's main purpose is to showcase how directives can communicate with each other. The stop-light directive\n" +
    "       is communicating with a fast-clicker directive, which communicates with the stopwatch directive. The end result is a \n" +
    "       mini game to see how fast you can click the button when the light turns green.</p>\n" +
    "   </div>\n" +
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
