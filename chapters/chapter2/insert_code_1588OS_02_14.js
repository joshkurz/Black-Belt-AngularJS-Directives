compile: function(tElem, tAttrs){
  if (!tAttrs.options){
    throw new Error('Must Pass an options object from the
    Controller For the Stopwatch to Work Correctly.');
  }
  return function(scope, elem, attrs, controller, transclude){
    // same exact link function as we had before.
  };
}