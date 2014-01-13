angular.module('AngularBlackBelt.demo/treeNodes', ['directives/demo/treeNodes/treeNodesDemo.tpl.html'])
.controller("TreeNodesCtrl", ['$scope', function($scope) {
    $scope.node = {
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
}]);