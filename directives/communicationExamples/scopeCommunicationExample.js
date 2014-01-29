//http://jsfiddle.net/joshkurz/sAY4R/2/
//<input ng-model="hello">
//<div bb-hello-watcher watcher="hello" setter="hey">{{hey}}</div>
//<div bb-hello-watcher watcher="hey" setter="hi">{{hi}}</div>
angular.module('scopeDemonstration', [])
.directive('bbHelloWatcher', 
    function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(attrs.watcher, function(newV,oldV){
                    scope[attrs.setter] = newV;
                });
            }
        };
    }
);


//http://jsfiddle.net/joshkurz/sAY4R/3/
//<input ng-model="hey">
//<div bb-hello-setter>{{hey}}</div>
//<div bb-hello-watcher>{{hi}}</div>
angular.module('scopeDemonstration', [])
.directive('bbHelloDirective', 
    function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.hey = 'Hey Hey Hey';
            }
        };
    }
)
.directive('bbHelloWatcher', 
    function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch('hey', function(newV,oldV){
                    scope.hi = newV;
                });
            }
        };
    }
);
