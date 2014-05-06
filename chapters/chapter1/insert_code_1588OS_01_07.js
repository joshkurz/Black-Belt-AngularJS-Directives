angular.module('Menus', [])
.directive('bbAnimatedMenu', [function(){
  return{
    restrict: 'EA',
    replace: true,
    template: function(tElem, tAttrs){
    return '<div class="animated-menu animated-menuvertical animated-menu-left">' +
        '{{hello}}' +
       '</div>';
    },
    link: function(scope, elem, attrs){
      scope.showMenu = function() {};
    }
  };
}])
.controller('menuCtrl', function($scope){
  $scope.hello = 'Hello';
  $scope.hello2 = ' World';
})
// This directive is Called in HTML with this syntax
// <div bb-animated-menu test="{{hello}}"><div>