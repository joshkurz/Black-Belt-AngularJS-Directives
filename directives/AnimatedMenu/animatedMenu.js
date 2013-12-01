angular.module('Menus', [])
.controller('menuCtrl', function($scope){
    $scope.hello = 'Hello';
})
.directive('animatedMenu', ['$animate', function($animate){
    return{
        restrict: 'EA',
        replace: true,
        template: function(tElem, tAttrs){
            return '<div class="animated-menu animated-menu-vertical animated-menu-left">' +
                     '{{hello}}'  +
                    '</div>';
        },
        link: function(scope, elem, attrs){

          scope.showMenu = function() {
              elem.toggleClass('animated-menu-push-toright' );
          };
      }
    };
}]);