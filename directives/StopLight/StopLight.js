angular.module('StopLight',[])
.controller('demoCtrl', ['$scope', function($scope){
    
    $scope.states = [{
        lineWidth: 6,
        strokeStyle: '#003300',
        radius: 60,
        state: 'green'
    },{
        lineWidth: 6,
        strokeStyle: '#003300',
        radius: 60,
        state: 'red',
        reverse: true
    }];
    
    $scope.stopAllStates = function(){
        for(var i = 0;i < $scope.states.length;i++){
            $scope.states[i].state = 'red';
        }
    };
        
}])
  
  /*
  * The StopLight module consists of two directives, one controller, and one service. 
  * StopLightContainer: Contains the StopLight Directive
  * StopLight: The SVG Element that renders the active light.
  * StopLightCtrl: Switches the state of the Stop Light
  * svgService: A service that performs svg functions.
  */
.service('svgService', [ function(){
    
    var service = {
      
      /*
      * changeColor
      * @description: If the state of this canvas is equal to the parentState, then set as state otherwise set as #ccc
      * @param: canvas <domElement> - the canvas element to alter
      * @param: attrsState: <string> - the state of the light directive given from the view
      * @param: parentState: <string> - the actual stop light state to check against.
      */
      changeColor : function(canvas,attrsState,parentState){

        if(attrsState === parentState){
          canvas.fillStyle = attrsState;  
        } else {
          canvas.fillStyle = '#ccc';
        }
        canvas.fill();
        canvas.stroke();
         
        return canvas;
      },
      /*
      * setUpStopLight
      * @description: Does the Dom Manipulation on the canvas element.
      * @param: canvas {domElement} - the canvas element to alter
      * @param: options: {obj} - an object that contains
      */
      setUpStopLight : function(canvas,options){
                canvas.beginPath();
                canvas.arc(options.width/2,options.height/2, options.radius, 0, 12 * Math.PI, false);
                canvas.lineWidth = options.lineWidth;
                canvas.strokeStyle = options.strokeStyle;
                this.changeColor(canvas,options.attrsState,options.state);
      }
    };
    
    return service;
    
        
}])
.controller('stopLightCtrl', ['$scope','$interval', function($scope,$interval){
    
    this.options = $scope.options;
    
    this.setNextState = function(){
        state = $scope.options.state;
        if($scope.options.reverse === true){
            $scope.options.state =  state==='red'?'yellow':state==='yellow'?'green':'red';
        } else {
          $scope.options.state =  state==='red'?'green':state==='yellow'?'red':'yellow';   
        }
    };
    
    $interval(this.setNextState,3000);
    
        
}]).directive('stopLightContainer', [ function() {
    return {
        restrict: 'A',
        controller: 'stopLightCtrl',
        transclude: true,
        scope: {options: '='},
        template: '<div ng-transclude></div>',
        replace: true
    };
}]).directive('stopLight', ['svgService', function(svgService) {
    return {
        restrict: 'A',
        require: '^stopLightContainer',
        scope: {},
        link: function(scope,element,attrs,stopLightCtrl) {
            
            if ( element[0].tagName !== 'CANVAS' ) {
              throw new Error('StopLight can only be a canvas element. ' + element[0].tagName + ' will not work.');
            }
            
            var context = element[0].getContext('2d');
            
            scope.options =  angular.extend({ 
              attrsState: attrs.state,
              height: element[0].height,
              width: element[0].width
            },stopLightCtrl.options);

            function getStopLightState(){
              return stopLightCtrl.options.state;
            }
            
            svgService.setUpStopLight(context,scope.options);
          
            scope.$watch(getStopLightState, function(newV,oldV){
              if(newV !== oldV){
                svgService.changeColor(context,scope.options.attrsState,newV);
              }
            });
        }
    };
}]);