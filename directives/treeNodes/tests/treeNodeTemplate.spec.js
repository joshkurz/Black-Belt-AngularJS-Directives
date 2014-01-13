describe('TreeNodeTemplate', function () {
  'use strict';

  var scope, $compile;

  beforeEach(module('AngularBlackBelt.treeNodes'));
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    scope.node = {
        name : "Parent",
        children: [{
            name : "Child1",
  
            children: [{
                name : "Grandchild1",
      
                children: [{
                    name : "Super Man",
          
                    children: [{
                      name : "Super Boy",
            
                      children: []
                    },
                      {
                      name : "Super Girl",
            
                      children: []
                    }]
                }]
            },{
                name : "Grandchild2",
      
                children: []
            },{
                name : "Grandchild3",
      
                children: []
            }]
        }, {
            name: "Child2",
  
            children: []
        }]
    };
  }));

  describe('Creating The Tree Node With A Template Directives', function () {
    var treeNode;
    beforeEach(function(){
        treeNode = $compile('<div tree-node-template family="node">' +         
            '<a href="" ng-click="family.show = !family.show">{{ family.name }}</a>' +
          '</div>')(scope);
        scope.$apply();
        expect(treeNode).not.toBe(undefined);
    }); 

    it('should Expect the tree node to have the correct amount of children', function() {
      expect(treeNode.children().length).toBe(1);
    }); 

    it('should Expect the tree node to update itself when the nodes change their visibility', function() {
      expect(treeNode.find('li').length).toBe(17);
      scope.node.children[0].children[0].show  = false;
      scope.$apply();
      expect(treeNode.find('li').length).toBe(11);
      scope.node.children[0].show  = false;
      scope.$apply();
      expect(treeNode.find('li').length).toBe(5);
      scope.node.show = false;
      scope.$apply();
      expect(treeNode.find('li').length).toBe(1);
    }); 

  });

});