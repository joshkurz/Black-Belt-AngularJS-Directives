//http://jsfiddle.net/joshkurz/FsWC2/4/

angular.module('AngularBlackBelt.AnimatedMenu', [])
.controller('menuCtrl', function($scope){
    $scope.hello = 'Hello';
    $scope.hello2 = ' World';
})
.directive('animatedMenu', [function(){
    return{
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: function(tElem, tAttrs){
            return '<div class="animated-menu animated-menu-vertical animated-menu-left">' +
                     '{{hello}}'  +
                    '</div>';
        },
        link: function(scope, elem, attrs, controller, transcludeFn){
          
          var clonedElement = transcludeFn(function(clone){
            return clone;
          });
          elem.append(clonedElement);
          scope.showMenu = function() {
              elem.toggleClass('animated-menu-push-toright' );
          };
      }
    };
}]);

// link: {
//   pre: function(scope, elem, attrs, controller, transcludeFn){
//     scope.showMenu = function() {
//       elem.toggleClass('animated-menu-push-toright' );
//     };
//   },
//   post: function(scope,elem,attrs,controller,transcludeFn){
//     var clonedElement = transcludeFn(function(clone){
//       return clone;
//     });
//     elem.append(clonedElement);
//     scope.showMenu();
//   }
// }

// compile: function(tElem, tAttrs){
           
//     return {
//         pre: function(scope, elem, attrs, controller, transcludeFn){
//           scope.showMenu = function() {
//             elem.toggleClass('animated-menu-push-toright' );
//           };
//         },
//         post: function(scope,elem,attrs,controller,transcludeFn){
//          var clonedElement = transcludeFn(function(clone){
//             return clone;
//           });
//           elem.append(clonedElement);

//           scope.showMenu();
//         }
//     }
// }
