describe('Creating The Tree Node With No Template Directives', function () {
    var treeNode;
    beforeEach(function(){
        treeNode = $compile('<div tree-node-no-template>' +
            '<ul id="testList111" class="list-group">' +
              '<li class="list-group-item">' +
                '<a href=""><span class="btn" ng-show="node.children && !node.show" ng-click="node.show=!node.show">[+]</span>' +
                '<span class="btn" ng-show="node.children && node.show" ng-click="node.show=!node.show">[-]</span>' +
                '{{node.name}}</a>' +
              '</li>' +
              '<li ng-if="$parent.node.show" class="list-group-item" ng-repeat="node in node.children"><div ng-transclude></div></li>' +
            '</ul>' +
          '</div>')(scope);
        scope.$apply();
        expect(treeNode).not.toBe(undefined);
    }); 

    it('should Expect the tree node to have the correct amount of a tags', function() {
      expect(treeNode.find('li').length).toBe(1);
    }); 

    it('should Expect the tree node to have the correct amount of children', function() {
      var treeANodes = treeNode.find('a');
      expect($(treeANodes[0]).text()).toBe('[+][-]Super Grandpa');
    }); 

    it('should Expect the tree node to update itself when the nodes change their visibility', function() {
      expect(treeNode.find('a').length).toBe(1);
      scope.node.show = true;
      scope.$apply();
      expect(treeNode.find('a').length).toBe(2);
      expect($(treeNode.find('a')[1]).text()).toBe('[+][-]Super Man');
      scope.node.children[0].show = true;
      scope.$apply();
      expect(treeNode.find('a').length).toBe(4);
      expect($(treeNode.find('a')[2]).text()).toBe('[+][-]Super Boy');
      expect($(treeNode.find('a')[3]).text()).toBe('[+][-]Super Girl');
    }); 

  });