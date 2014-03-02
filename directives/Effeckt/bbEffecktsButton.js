angular.module('bbEffectButtonModule', [])
.directive('bbEffecktButton', ['$timeout', function($timeout){
    
    return {
        restrict: 'AC',
        scope: true,
        link: function(scope, element, attrs){
           
            scope.loadPowers = function(){
                if(element.attr('data-loading')){
                    element.removeAttr('data-loading');
                } else {
                  element.attr('data-loading', true);
                  $timeout(function(){
                    element.removeAttr('data-loading');
                  },2000);
                }
             };    
        }
    };
}]);