describe('TreeNodeTemplate', function () {
  'use strict';

  var scope, $compile;

  beforeEach(module('AngularBlackBelt.treeNodes'));
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    scope.node = {
          name : "Super Grandpa",

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

    it('should Expect the tree node to have the correct amount of a tags', function() {
      expect(treeNode.find('a').length).toBe(4);
    }); 

    it('should Expect the tree node to have the correct amount of children', function() {
      var treeANodes = treeNode.find('a');
      expect($(treeANodes[0]).text()).toBe('Super Grandpa');
      expect($(treeANodes[1]).text()).toBe('Super Man');
      expect($(treeANodes[2]).text()).toBe('Super Boy');
      expect($(treeANodes[3]).text()).toBe('Super Girl');
    }); 

    it('should Expect the tree node to update itself when the nodes change their visibility', function() {
      expect(treeNode.find('a').length).toBe(4);
      scope.node.children[0].show  = false;
      scope.$apply();
      expect(treeNode.find('a').length).toBe(2);
      scope.node.show  = false;
      scope.$apply();
      expect(treeNode.find('a').length).toBe(1);
    }); 

  });

});