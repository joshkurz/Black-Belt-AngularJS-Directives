describe('Basic Communication with Directives', function () {
  beforeEach(module('BasicCommunicationExamples'))
    var directives,
    bbDirective1,
    bbDirective2;
    
    beforeEach(function(){
      var integration = angular.element('<div>' +
                                          '<div bb-directive1></div>' +
                                          '<div bb-directive2></div>' +
                                        '</div>');
      directives = $compile(integration)(scope);
      scope.$apply();
      bbDirective1 = $(directives.find('.directive')[0]);
      bbDirective2 = $(directives.find('.directive')[1]);
    });
    
    it('should start with a message that says Not Clicked', function(){
      expect(bbDirective1.text()).toBe('Not Clicked');
      expect(bbDirective2.text()).toBe('Not Clicked');
    });

    it('should alter each others text when clicked', function(){
      bbDirective1.click();
      expect(bbDirective2.text()).toBe('bbDirective1 Clicked');
      bbDirective2.click();
      expect(bbDirective1.text()).toBe('bbDirective2 Clicked');
    });
});