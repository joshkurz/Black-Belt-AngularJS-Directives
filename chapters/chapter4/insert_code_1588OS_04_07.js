//http://plnkr.co/edit/QD8KfOhwy2xOoxb0NN6g?p=preview Regular
//http://plnkr.co/edit/poSbBx?p=preview Animation
angular.module('treeNodeNoTemplateModule', [])
.directive('treeNodeNoTemplate', ['$compile', function($compile) {
  return {
    restrict: 'EA',
    compile: function(element, attr) {

      var $template = element.clone().contents();
      element.html(''); // clear contents

      return function($scope, $element, $attr) {
        
         var linkFn = $compile($template, function(scope, cloneAttachFn) {
          return linkFn(scope, cloneAttachFn);
        });

        linkFn($scope, function(contents) {
          $element.append(contents);
        });
      };

    }
  };
}]);