angular.module("directives/demo/treeNodes/treeNodesDemo.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/demo/treeNodes/treeNodesDemo.tpl.html",
    "<div class=\"well jumbotron container\">\n" +
    "  <div class=\"container\">\n" +
    "      <div class=\"bs-callout bs-callout-info alignTextLeft\">\n" +
    "        <span>\n" +
    "          <h1>Recursive Directives</h1>\n" +
    "        </span>\n" +
    "        <p>These directives are using recursion to accomplish thier final DOM. Each of them have their own special way to achieve \n" +
    "          the same result. The purpose of these examples is to showcase how powerful a recursive directive can be, in terms of simplicity and effectivness.</p>\n" +
    "      </div>\n" +
    "      <div class=\"col-md-4\">\n" +
    "          <div class=\"alert alert-success\">\n" +
    "            Recursion only using Transclusion\n" +
    "          </div>\n" +
    "          <div tree-node-no-template>\n" +
    "            <ul class=\"list-group\"> \n" +
    "              <li class=\"list-group-item\">\n" +
    "                <span class=\"btn\" ng-show=\"node.children && !node.show\" ng-click=\"node.show=!node.show\">[+]</span>\n" +
    "                <span class=\"btn\" ng-show=\"node.children && node.show\" ng-click=\"node.show=!node.show\">[-]</span>\n" +
    "                {{node.name}}\n" +
    "              </li>\n" +
    "              <li ng-if=\"$parent.node.show\" class=\"list-group-item childNode\" ng-repeat=\"node in node.children\" ng-transclude></li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"col-md-4\">\n" +
    "          <div class=\"alert alert-success\">\n" +
    "            Recursion Using a Template and Transclusion\n" +
    "          </div>\n" +
    "          <div tree-node-template family=\"node\">           \n" +
    "            <a href=\"\" ng-click=\"family.show = !family.show\">{{ family.name }}</a>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "      \n" +
    "      <div class=\"col-md-4\">\n" +
    "          <div class=\"alert alert-success\">\n" +
    "            Recursion Using only ng-inlclude\n" +
    "          </div>\n" +
    "          <ul class=\"list-group\">\n" +
    "            <li class=\"list-group-item\">\n" +
    "                <span class=\"btn\" ng-show=\"node.children && !node.show\" ng-click=\"node.show=!node.show\">[+]</span>\n" +
    "                <span class=\"btn\" ng-show=\"node.children && node.show\" ng-click=\"node.show=!node.show\">[-]</span>\n" +
    "                {{node.name}}\n" +
    "            </li>\n" +
    "            <li ng-if=\"$parent.node.show\" class=\"list-group-item\" ng-repeat=\"data in node.children\" ng-include=\"'tree_item_renderer.tpl.html'\"></li>\n" +
    "          </ul>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "  ");
}]);
