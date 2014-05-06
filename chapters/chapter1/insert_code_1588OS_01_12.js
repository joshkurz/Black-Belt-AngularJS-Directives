link: function(scope,element,attrs,stopLightCtrl) {
  var context = element[0].getContext('2d');
  
  scope.options = angular.extend({
    attrsState: attrs.state,
    height: element[0].height,
    width: element[0].width
  },stopLightCtrl.options);
  
  function getStopLightState(){
    return stopLightCtrl.options.state;
  }
  
  svgService.setUpStopLight(context,scope.options);
  scope.$watch(getStopLightState, function(newV,oldV){
    if(newV !== oldV){
      svgService.changeColor(context,scope.options.
      attrsState,newV);
    }
  });
}