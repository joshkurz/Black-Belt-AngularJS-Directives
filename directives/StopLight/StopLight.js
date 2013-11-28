angular.module('StopLight',[])
.controller('demoCtrl', ['$scope', function($scope){
    
    $scope.stopLightOptions = {
        lineWidth: 6,
        strokeStyle: '#003300',
        radius: 60,
        state: 'green'
    };
    
    $scope.stopLights = [{type: 'drag', color: 'red'},{type: 'traffic', color: 'green'}];
        
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
      * @param: state: {obj} - unique instance of state
      */
      setUpStopLight : function(canvas,options,state){
                canvas.beginPath();
                canvas.arc(options.width/2,options.height/2, options.radius, 0, 12 * Math.PI, false);
                canvas.lineWidth = options.lineWidth;
                canvas.strokeStyle = options.strokeStyle;
      }
    };
    
    return service;
    
        
}])
.controller('stopLightCtrl', ['$scope','$interval', function($scope,$interval){
    var state, options = $scope.options;
    //state must be specific to the singular stop light instance
    this.state = state = $scope.state;
    if(state.type === 'drag'){
        state.reverse = true;
    }

    
    this.setNextState = function(){
        if(state.reverse === true){
            state.color =  state.color==='red'?'yellow':state.color==='yellow'?'green':'red';
        } else {
          state.color =  state.color==='red'?'green':state.color==='yellow'?'red':'yellow';   
        }
    };
    
    this.getOptions = function(){
       return options;
    }
    
    this.getState = function(){
      return state;
    }
    
    
    $interval(this.setNextState,3000);
    
        
}]).directive('stopLightContainer', [ function() {
    return {
        restrict: 'A',
        controller: 'stopLightCtrl',
        transclude: true,
        scope: {options: '=', state: '='},
        template: '<div>' +
          '<div class="protector"></div>' + 
          '<div class="protector"></div>' + 
          '<div class="protector"></div>' +
          '<span ng-transclude></span></div>',
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
            
            var firstLoad = true,
                context = element[0].getContext('2d');
            
            scope.options =  angular.extend({ 
              height: element[0].height,
              width: element[0].width
            },stopLightCtrl.getOptions());
            

            function getStopLightState(){
              return stopLightCtrl.getState().color;
            }
            
            svgService.setUpStopLight(context,scope.options);
          
            scope.$watch(getStopLightState, function(newV,oldV){
                if(newV !== oldV || firstLoad === true){
                    svgService.changeColor(context,attrs.state,newV);
                    firstLoad = false;
                }
            });
        }
    };
}]);