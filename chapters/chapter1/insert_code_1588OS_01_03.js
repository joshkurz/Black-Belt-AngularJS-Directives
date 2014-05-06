/*

    Example 1

*/

// String representation of a defining scope's variables
Javascript: Scope: {'name': '@'}
HTML: <div bb-stop-watch name="{{localName}}"></div>
// An expression executed on the defining scope
Javascript: Scope: {'name' : '&'}
HTML: <div bb-stop-watch name="newName = localName + ' ha ha'"></div>
// Two Way Data Binding
JavaScript: Scope: {'name': '='}
HTML: <div bb-stop-watch name="localName"></div>

/*

    Example 2

*/

// String representation of a defining scope's variables
JavaScript: Scope: {'name': '@theName'}
HTML: <div bb-stop-watch the-name="{{localName}}"></div>
// An expression executed on the defining scope
JavaScript: Scope: {'name' : '&theName'}
HTML: <div bb-stop-watch the-name=
"newName = localName + ' ha ha'"></div>
// Two Way Data Binding
JavaScript: Scope: {'name': '=theName'}
HTML: <div bb-stop-watch the-name="localName"></div>