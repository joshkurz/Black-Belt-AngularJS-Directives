//http://plnkr.co/edit/QD8KfOhwy2xOoxb0NN6g?p=preview
angular.module('treeNodeNoTemplateModule', [])
.directive('treeNodeNoTemplate', ['$compile', function($compile) {
  return {
    restrict: 'EA',
    scope: true,
    terminal: true, 
    compile: function(element, attr) {
      var $template = element.clone().contents();
      element.html(''); // clear contents

      var linkFn = $compile($template, function(scope, cloneAttachFn) {
        return linkFn(scope, cloneAttachFn);
      });

      return function($scope, $element, $attr) {

        linkFn($scope, function(contents) {
          $element.append(contents);
        });
      };

    }
  };
}]);