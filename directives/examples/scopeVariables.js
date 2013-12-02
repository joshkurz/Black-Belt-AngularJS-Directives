
// These are examples used in the book. 

// String representation of a defining scope’s variables
// Scope: {‘name’: ‘@’}
// <div stop-watch name=”{{localName}}”></div>

// // An expression executed on the defining scope
// Scope: {‘name’ : ‘&’}
// <div stop-watch name=”newName = localName + ‘ ha ha’”></div>

// // Two Way Data Binding
// Scope: {‘name’: ‘=’}
// <div stop-watch name=”localName”></div>


// String representation of a defining scope’s variables
// Scope: {‘name’: ‘@theName’}
// <div stop-watch the-name=”{{localName}}”></div>

// // An expression executed on the defining scope
// Scope: {‘name’ : ‘&theName’}
// <div stop-watch the-name=”newName = localName + ‘ ha ha’”></div>

//  // Two Way Data Binding
//  Scope: {‘name’: ‘=theName’}
// <div stop-watch the-name=”localName”></div>


angular.module('demoApp', [])
.controller('demoCtrl', function($scope){
    $scope.term = 'How To Master';
})
.directive('stringRep', function(){
    return {
        scope: { term: '@'},
        template: '<input ng-model="term">'
    }
})
.directive('exprRep', function(){
    return {
        scope: { term: '&'},
        template: '<input ng-model="term">',
        link: function(scope, element, attrs){
            scope.term = scope.term();
        }
    }
})
.directive('twoWayRep', function(){
    return {
        scope: { term: '='},
        template: '<input ng-model="term">'
    }
})
