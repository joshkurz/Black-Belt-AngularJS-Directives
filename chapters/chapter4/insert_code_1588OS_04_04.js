describe('Creating The Tree Node With A Template Directive', function () {
    var treeNode;
    
    // We are compiling the element before every test, so that we have it in memory and we can make sure that it is initialized without errors every time.
    beforeEach(function(){
        treeNode = $compile('<div tree-node-template family="node">' +         
            '<a href="" ng-click="family.show = !family.show">{{ family.name }}</a>' +
          '</div>')(scope);
        scope.$apply();
        expect(treeNode).not.toBe(undefined);
    }); 
    
    //This test proves that the treeNode directive creates 4 a tags inside of the element.
    it('should Expect the tree node to have the correct amount of a tags', function() {
      expect(treeNode.find('a').length).toBe(4);
    }); 
     
    //This test proves that the text of the treeNode directive’s a tags is correct. 
    it('should Expect the tree node to have the correct text for each child a', function() {
      var treeANodes = treeNode.find('a');
      expect($(treeANodes[0]).text()).toBe('Super Grandpa');
      expect($(treeANodes[1]).text()).toBe('Super Man');
      expect($(treeANodes[2]).text()).toBe('Super Boy');
      expect($(treeANodes[3]).text()).toBe('Super Girl');
    }); 
    
    //This test proves that the directive is working with dynamic scope changes accordingly.
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