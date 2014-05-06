app.directive('bbAnimatedMenu', function(){
  return{
    restrict: 'EA',
    replace: true,
    transclude: true,
    templateUrl: 'animatedMenu.tpl.html',
    link: function(scope, elem, attrs, nullCtrl, transcludeFn){
      //setting a variable that represents the cloned element,
      //which is where the original contents of this element were
      //before the compile function ran and generated the new
      //templated element.
      var clonedElement = transcludeFn(function(clone){
        return clone;
      });
      elem.append(clonedElement);
      scope.showMenu = function() {};
    }
  };
});