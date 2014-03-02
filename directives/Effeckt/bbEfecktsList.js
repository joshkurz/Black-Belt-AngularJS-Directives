angular.module('bbEffecktListModule', [])
.directive('bbEffecktList', ['$animate', function ($animate) {
    var lastScrollTop;

    function checkElement(elTop, elHeight, scrollHeight, parentHeight) {
        var velocity;
        if (scrollHeight > lastScrollTop) {
            velocity = 'down';
        } else {
            velocity = 'up';
        }
        lastScrollTop = elTop;
        //console.log(elTop)
        if (elTop - elHeight < scrollHeight && elTop + elHeight > scrollHeight - parentHeight) {
            return true;
        } else if (elTop > scrollHeight) {
            if (velocity === 'up') {
                return 'past';
            } else {
                return 'future';
            }
        } else if (elTop < scrollHeight) {
            if (velocity === 'up') {
                return 'future';
            } else {
                return 'past';
            }
        }
    }
    return {
        restrict: 'AC',
        link: function (scope, element, attrs) {
            
            var elHeight = element[0].offsetHeight;
            var offsetTop = element[0].offsetTop + elHeight;

            function animateList(event) {
                
                var scrollTop = event.srcElement.scrollTop + offsetTop,
                    children = element.find('li'),
                    childTop,
                    childHeight;
                
                for (var i = 0; i < children.length; i++) {
                    
                    var childEl = angular.element(children[i]);
                    childTop = children[i].offsetTop;

                    if(!childTop || !childHeight){
                        childHeight = children[i].offsetHeight;
                    }
                    if (isIn = checkElement(childTop, childHeight*4, scrollTop, elHeight)) {
                        if (isIn === true) {
                            childEl.removeClass('future')
                                   .removeClass('past');
                        } else if (isIn === 'past') {
                            childEl.removeClass('future')
                                   .addClass('past');
                        } else if (isIn === 'future') {
                            childEl.removeClass('past')
                                   .addClass('future');
                        } else {
                            childEl.addClass('future')
                                   .removeClass('past');
                        }
                    }
                }
            }

            element[0].addEventListener('scroll', animateList);
        }
    };
}]);