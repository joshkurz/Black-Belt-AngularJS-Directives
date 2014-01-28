describe('BasicCommunication', function () {
  
  var scope, $compile;
  

  function returnObject(subscriber,subscribee,rootScope){
    return {
      restrict: 'EA',
      scope: true,
      template: '<div class="directive" ng-click="clickMe()">{{message}}</div>',
      link: function(scope, elem, attrs){
         scope.message = 'Not Clicked';
         scope.clickMe = function(){
           rootScope.$broadcast(subscriber + 'Clicked', {message: subscriber + ' Clicked'});
         };

         scope.$on(subscribee + 'Clicked', function(event,data){
           scope.message = data.message;
         });
      }
    };
  }
    

  angular.module('BasicCommunicationExamples', [])
  .directive('bbDirective1', ['$rootScope', function($rootScope){
    return returnObject('bbDirective1','bbDirective2', $rootScope);
  }])
  .directive('bbDirective2', ['$rootScope', function($rootScope){
    return returnObject('bbDirective2','bbDirective1',$rootScope);
  }]);

  beforeEach(module('BasicCommunicationExamples'));
  beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
  }));

  describe('Basic Communication with Directives', function () {
    
    var directives,
        bbDirective1,
        bbDirective2;

    beforeEach(function(){
      directives = $compile('<div>' + 
                              '<div bb-directive1></div>' +
                              '<div bb-directive2></div>' +
                            '</div>')(scope);
      scope.$apply();
      bbDirective1 = $(directives.find('.directive')[0]);
      bbDirective2 = $(directives.find('.directive')[1]);
    });

    it('should start with a message that says Not Clicked', function(){
      expect(bbDirective1.text().trim()).toBe('Not Clicked');
      expect(bbDirective2.text().trim()).toBe('Not Clicked');
    });

    it('should alter each others text when clicked', function(){
      bbDirective1.click();
      expect(bbDirective2.text().trim()).toBe('bbDirective1 Clicked');
      bbDirective2.click();
      expect(bbDirective1.text().trim()).toBe('bbDirective2 Clicked');
    });

  });

});
