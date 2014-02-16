angular.module('AngularBlackBelt.StopLight',[])
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
    
    var interval = null,
        self = this;

    self.options = $scope.options;
    
    self.setNextState = function(){
        state = $scope.options.state;
        if($scope.options.reverse === true){
            $scope.options.state =  state==='red'?'yellow':state==='yellow'?'green':'red';
        } else {
          $scope.options.state =  state==='red'?'green':state==='yellow'?'red':'yellow';   
        }
        if(interval === null){
          interval = $interval(this.setNextState,self.options.interval);
        }
    };

    self.killInterval = function(){
      if(interval){
        $interval.cancel(interval); 
        interval = null;
      }
    };

    interval = $interval(this.setNextState,self.options.interval);

    $scope.$on('$destroy', function(node){
      self.killInterval();
    });
    
        
}]).directive('stopLightContainer', [ function() {
    return {
        controller: 'stopLightCtrl',
        scope: {options: '='}
    };
}]).directive('stopLight', ['svgService', function(svgService) {
    return {
        require: '^stopLightContainer',
        scope: true,
        compile: function(tElem,tAttrs){
          
            if ( tElem[0].tagName !== 'CANVAS' ) {
              throw new Error('StopLight can only be a canvas element. ' + tElem[0].tagName + ' will not work.');
            }

            return function(scope,element,attrs,controller) {
            
                var context = element[0].getContext('2d');
                
                scope.options = angular.extend({ 
                  attrsState: attrs.state,
                  height: element[0].height,
                  width: element[0].width
                },controller.options);

                function getStopLightState(){
                  return controller.options.state;
                }
                
                svgService.setUpStopLight(context,scope.options);
              
                scope.$watch(getStopLightState, function(newV,oldV){
                  if(newV !== oldV){
                    svgService.changeColor(context,scope.options.attrsState,newV);
                  }
                });
            };
        }
    };
}]);

// link: function(scope,element,attrs,stopLightCtrl) {
            
//             if ( element[0].tagName !== 'CANVAS' ) {
//               throw new Error('StopLight can only be a canvas element. ' + element[0].tagName + ' will not work.');
//             }
            
//             var context = element[0].getContext('2d');
            
//             scope.options =  angular.extend({ 
//               attrsState: attrs.state,
//               height: element[0].height,
//               width: element[0].width
//             },stopLightCtrl.options);

//             function getStopLightState(){
//               return stopLightCtrl.options.state;
//             }
            
//             svgService.setUpStopLight(context,scope.options);
          
//             scope.$watch(getStopLightState, function(newV,oldV){
//               if(newV !== oldV){
//                 svgService.changeColor(context,scope.options.attrsState,newV);
//               }
//             });
//         }