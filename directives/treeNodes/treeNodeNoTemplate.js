//http://plnkr.co/edit/QD8KfOhwy2xOoxb0NN6g?p=preview Regular
//http://plnkr.co/edit/VndYa0NotSDX600Peqbu?p=preview Animation
//http://plnkr.co/edit/sKg6Wj0y2zRaRpJkSwgc?p=preview Staggering Animation
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