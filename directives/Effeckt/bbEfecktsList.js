angular.module('bbEffecktListModule', [])
.factory('scrollDirectionFactory', function(){
    
    return function(){
        
        var lastScrollTop;
        
        return {
            checkElement : function(elTop, elHeight, scrollHeight, parentHeight) {
                var velocity;
                if (scrollHeight > lastScrollTop) {
                    velocity = 'down';
                } else {
                    velocity = 'up';
                }
                lastScrollTop = elTop;

                if (elTop - elHeight < scrollHeight && elTop + elHeight > scrollHeight - parentHeight) {
                    return true;
                } else if (elTop >= scrollHeight) {
                    if (velocity === 'up') {
                        return 'past';
                    } else {
                        return 'future';
                    }
                } else if (elTop <= scrollHeight) {
                    if (velocity === 'up') {
                        return 'future';
                    } else {
                        return 'past';
                    }
                }
            }
        };

    };

})
.directive('bbEffecktList', ['$animate', 'scrollDirectionFactory', function ($animate, scrollDirectionFactory) {
    
    var scrollService = scrollDirectionFactory();
    return {
        restrict: 'AC',
        link: function (scope, element, attrs) {
            
            var elHeight = element[0].offsetHeight;

            function animateList(event) {
                
                var scrollTop = $(this).scrollTop() + elHeight,
                    children = element.find('li'),
                    childTop,
                    childHeight;
                
                for (var i = 0; i < children.length; i++) {
                    
                    var childEl = angular.element(children[i]);
                    childTop = children[i].offsetTop;

                    if(!childTop || !childHeight){
                        childHeight = children[i].offsetHeight;
                    }
                    if (isIn = scrollService.checkElement(childTop, childHeight*4, scrollTop, elHeight)) {
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
}])
.directive('bbCustomEffecktList', ['$animate', 'scrollDirectionFactory', function ($animate, scrollDirectionFactory) {
    
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
                            $animate.removeClass(childEl, 'past');
                            $animate.removeClass(childEl, 'future');
                            $animate.addClass(childEl, 'normal');
                        } else if (isIn === 'past') {
                            $animate.removeClass(childEl, 'future');
                            $animate.removeClass(childEl, 'normal');
                            $animate.addClass(childEl, 'past');
                        } else if (isIn === 'future') {
                            $animate.removeClass(childEl, 'past');
                            $animate.removeClass(childEl, 'normal');
                            $animate.addClass(childEl, 'future');
                        } else {
                            $animate.removeClass(childEl, 'past');
                            $animate.removeClass(childEl, 'normal');
                            $animate.addClass(childEl, 'future');
                        }
                    }
                }
            }

            element.scroll(animateList);
        }
    };
}]).animation('.effeckt-list-item', function() {
  return {

    addClass : function(element, className, done) { 

       if(className === 'future'){
         TweenMax.from(element, 1.5, {rotationY:360, transformOrigin:"left 50% 200", onComplete: done});
       } else if(className === 'normal'){
         TweenMax.to(element, 0.5, {opacity: 1, left: 0, rotationY: 0, onComplete: done});
       } else if(className === 'past') {
         TweenMax.to(element, 1.5, {rotationY:360, transformOrigin:"left 50% -200", onComplete: done});
       }
    }
  };
});