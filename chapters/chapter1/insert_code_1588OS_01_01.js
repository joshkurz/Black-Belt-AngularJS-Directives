var definitionObject = {
  restrict: 'EA',
  link: function(scope, element, attrs){
    element.text('Hello Directive World');
  }
};

app.directive('bbHelloWorld', function(){
  return definitionObject;
});