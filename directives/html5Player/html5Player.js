angular.module('AngularBlackBelt.html5Player', [])
.directive('html5Player', [function(){
	return {
		restrict: 'EA',
		replace: true,
		scope: {
			videoConfig: '='
		}
		compile: function(tElem, tAttrs){

			return(scope, element, attrs){
				
			}
		}
	}
}])