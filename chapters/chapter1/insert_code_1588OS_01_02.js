app.directive('directiveTwo', function() {
  return {
    priority: 10,
    terminal: true,
    link: function(scope,element,attrs) {
      //link logic
    }
  }
});

/*
  HTML Demo

<div directive-one directive-two directive-three>
<directive-four></directive-four>
</div>

*/