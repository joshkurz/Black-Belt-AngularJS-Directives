/*
  This test showcases how directives can communicate with remote resources to accomplish their desired views. 
*/
describe('bbPhoneListApp Demo', function () {
  'use strict';

  var scope, $compile, $httpBackend;

  beforeEach(module('bbPhoneListApp'));
  beforeEach(inject(function (_$rootScope_, _$compile_,_$httpBackend_) {
    scope = _$rootScope_;
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;

    $httpBackend.whenGET('test-phone.json')
                .respond({
                    "age": 1, 
                    "id": "xxx-xxx-xxxx", 
                    "imageUrl": "testPhone.jpg", 
                    "name": "Amazing Phone", 
                    "snippet": "This is a Super Duper Phone"
                });

    $httpBackend.whenGET('test-phone2.json')
                .respond({
                    "age": 2, 
                    "id": "yyy-xxx-xxxx", 
                    "imageUrl": "testPhone2.jpg", 
                    "name": "Cool Phone", 
                    "snippet": "This is a Super Amazing Phone"
                });

    $httpBackend.whenGET('error.json')
                .respond(404);
  }));

  beforeEach(function(){
      scope.configObj = {url: "test-phone.json"};
      successPhoneLinkFn = $compile('<div bb-phone-details config="configObj"></div>');
      errorPhoneLinkFn = $compile('<div bb-phone-details config="configObj"></div>');
  });
