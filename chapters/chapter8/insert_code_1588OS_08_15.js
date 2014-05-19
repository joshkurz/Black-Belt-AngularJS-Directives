 app.animation('.effeckt-list-item', function() {
  return {

    addClass : function(element, className, done) { 
        
       function realDone(){
         if(className === 'normal'){
           element.removeClass('past');
           element.removeClass('future');
         } else if(className === 'future'){
           element.removeClass('normal');
           element.removeClass('past');
         } else {
           element.removeClass('normal');
           element.removeClass('future');
         }
         done();
       }

       if(className === 'future'){
         TweenMax.from(element, 1.5, {opacity: 0, rotation:-360, transformOrigin:"left 50% 200", onComplete: realDone});
       } else if(className === 'normal'){
         TweenMax.to(element, 0.5, {opacity: 1, left: 0, rotation: 0, onComplete: realDone});
       } else if(className === 'past') {
         TweenMax.to(element, 1.5, {opacity: 0, rotation:360, transformOrigin:"left 50% -200", onComplete: realDone});
       }
    }
  };
});
