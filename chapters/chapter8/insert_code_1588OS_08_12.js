app.factory('scrollDirectionFactory', function(){
    
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

});
