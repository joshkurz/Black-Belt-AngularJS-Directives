app.directive('sampleDirective', function(){
  return {
    scope:{localVar: 'ngModel'},
    link: function(scope, element, attrs){
      //calling the third party function on the element
      element.thirdPartyFunction();
    }
  };
});