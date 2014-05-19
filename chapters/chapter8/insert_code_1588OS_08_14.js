app .directive('bbCustomEffecktList', ['$animate', 'scrollDirectionFactory', function ($animate, scrollDirectionFactory) {
    
    var scrollService = scrollDirectionFactory();

    return {
        restrict: 'AC',
        link: function (scope, element, attrs) {
            
            var elHeight = element[0].offsetHeight;

            function animateList(event) {
                
                var scrollTop = event.currentTarget.scrollTop + elHeight,
                    children = element.find('li'),
                    childTop,
                    childHeight;
                
                for (var i = 0; i < children.length; i++) {
                    
                    var childEl = angular.element(children[i]);
                    childTop = children[i].offsetTop;

                    if(!childTop || !childHeight){
                        childHeight = children[i].offsetHeight;
                    }

                    if (isIn = scrollService.checkElement(childTop, childHeight, scrollTop, elHeight)) {

                        if (isIn === true) {
                            $animate.addClass(childEl, 'normal');
                        } else if (isIn === 'past') {
                            $animate.addClass(childEl, 'past');
                        } else if (isIn === 'future') {
                            $animate.addClass(childEl, 'future');
                        } else {
                            $animate.addClass(childEl, 'future');
                        }
                    }
                }
            }

            element[0].addEventListener('scroll', animateList);
        }
    };
}])
