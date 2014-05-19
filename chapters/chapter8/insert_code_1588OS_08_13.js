it('should call the addClass method when the element is scrolled', function(){
        effecktNode[0].dispatchEvent(scrollEvent);
        expect($animate.addClass.callCount).toBe(5);
        expect($animate.addClass.mostRecentCall.args[1]).toBe('past');
});
