compile: function(tElem, tAttrs){
  return function(scope, elem, attrs, nullCtrl, transcludeFn){
    var clonedElement = transcludeFn(function(clone){
      return clone;
    });
    elem.append(clonedElement);
    scope.showMenu = function() {};
  }
}