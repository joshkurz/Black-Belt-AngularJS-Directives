var app = angular.module('TerminalExample', []);

app.directive('directiveOne', function() {
  return {
    link: function() {
      //link logic
    }
  };
});
app.directive('directiveTwo', function() {
  return {
    priority: 10,
      terminal: true,
      link: function() {
        //link logic
      }
    };
});
app.directive('directiveThree', function() {
  return {
    priority: 100,
      link: function() {
        //link logic
      }
  };
});