compile: function(tElem, tAttrs){
  return {
    pre: function(scope, elem, attrs, controller, transcludeFn){
      scope.showMenu = function() {
        elem.toggleClass('animated-menu-push-toright' );
      };
    },
    post: function(scope,elem,attrs,controller,transcludeFn){
      var clonedElement = transcludeFn(function(clone){
        return clone;
      });
      elem.append(clonedElement);
      scope.showMenu();
    }
  }
}