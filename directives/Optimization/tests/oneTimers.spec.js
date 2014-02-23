describe('OneTime Binding Directives', function () {
  'use strict';

  var scope, $compile;

  beforeEach(module('OneBinders'));
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
  }));

describe('Creating The bbOneBind* directive', function () {
    
    angular.forEach(['text','src','href','id','class','alt','value','title'], function(v){
       var oneBindNode;
      //Should create bbOneBind*
      beforeEach(function(){
          scope.testValue = 'tester+tester+tester' + v;
          oneBindNode = $compile('<div bb-one-bind-' + v + '="testValue"></div>')(scope);
          scope.$apply();
          expect(oneBindNode).not.toBe(undefined);
      }); 
      
      it('should have the correct text for the oneTime directive', function() {
        if(v === 'text'){
          expect(oneBindNode[v]()).toBe('tester+tester+tester' + v);
        } else if(v === 'class'){
          expect(oneBindNode.hasClass('tester+tester+tester' + v)).toBe(true);
        } else {
          expect(oneBindNode.attr(v)).toBe('tester+tester+tester' + v);
        }
      });

      it('should not have any watchers on the scope', function() {
        expect(scope.$$watchers.length).toBe(0);
      });
    });

});

describe('Creating bbOneBindHtml and bbOneBindStyle directive', function () {
      
      it('should set the correct html to the element and destroy the watchers', function() {
        scope.testValue = '<p>No Bindings</p>';
        var oneBindHtmlNode = $compile('<div bb-one-bind-html="testValue"></div>')(scope);
        scope.$apply();
        expect(oneBindHtmlNode.html()).toBe('<p>No Bindings</p>'); 
        expect(scope.$$watchers.length).toBe(0);  
      });

      it('should set the correct style to the element and destroy the watchers', function() {
        scope.testValue = {width: '100px', height: '200px'};
        var oneBindStyleNode = $compile('<div bb-one-bind-style="testValue"></div>')(scope);
        scope.$apply();
        expect(oneBindStyleNode.css('height')).toBe('200px'); 
        expect(oneBindStyleNode.css('width')).toBe('100px'); 
        expect(scope.$$watchers.length).toBe(0);  
      });

});


});