// describe('mediaelement', function () {
//   'use strict';

//   var scope, $compile;

//   beforeEach(module('AngularBlackBelt.mediaelement'));
  
//   beforeEach(inject(function (_$rootScope_, _$compile_,_$controller_,_$interval_) {
//     scope = _$rootScope_.$new();
//     $compile = _$compile_;

//     scope.goodVideoObj = {
//         filePath: 'http://www.youtube.com/watch?v=6v2L2UGZJAM',
//         template: 'directives/mediaelement/youtubeMediaelementPlayer.tpl.html'
//     };

//     scope.badVideoObj = {
//       template: 'fakeTemplate'
//     };

//     scope.badVideoObj1 = {
//       filePath: 'fakepath'
//     };

//   }));

//   describe('Creating A mediaelement Directive', function () {

//     it('throw an error if there is no videoConfig set on the element', function() {
//       expect(function(){
//         var mediaelement = $compile('<div mediaelement></div>')(scope);
//         scope.$apply();
//       }).toThrow('Must Give a correct videoCofig object with a template and filePath');
//     });   

//     it('throw an error if there is no videoConfig.filePath', function() {
//       expect(function(){
//         var mediaelement = $compile('<div mediaelement video-config="badVideoObj"></div>')(scope);
//         scope.$apply();
//       }).toThrow('Must Give a correct videoCofig object with a template and filePath');
//     });  

//     it('throw an error if there is no videoConfig.template', function() {
//       expect(function(){
//         var mediaelement = $compile('<div mediaelement video-config="badVideoObj1"></div>')(scope);
//         scope.$apply();
//       }).toThrow('Must Give a correct videoCofig object with a template and filePath');
//     });  

//     it('do not throw an error when creating the directive with a good videoConfig', function() {
//       expect(function(){
//         var mediaelement = $compile('<div mediaelement video-config="goodVideoObj"></div>')(scope);
//         scope.$apply();
//       }).not.toThrow();
//     });  

//   });

// });