angular.module('AngularBlackBelt.CodeQuality', [])
.directive('bbNavMenu', [ function(){
  
  return {
    templateUrl: function(tElem,tAttrs){
        return tAttrs.templateUrl || 'directives/demo/templates/bbNavMenu.tpl.html';
    }
  };

}]);