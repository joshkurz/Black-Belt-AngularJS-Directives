app.animation('.animateMe', function(){
  return {
    enter: function(element, done){
        TweenMax.fromTo(element, 0.7, {
            boxShadow: "0px 0px 0px 0px rgba(0,255,0,0.3)"
        }, {
            boxShadow: "0px 0px 20px 10px rgba(0,255,0,0.7)",
            repeat: -1,
            yoyo: true,
            ease: Linear.easeNone,
            onComplete: done
        });
    }
  };
});
