/*
  These tests showcase how directives can communicate with remote resources to 
  accomplish their desired views. 
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
  
  describe('Rendering one bbPhoneDetails directive in the DOM', function(){
    
    var successPhoneLinkFn,
        errorPhoneLinkFn,
        successPhoneLinkedDOM,
        errorPhoneLinkedDOM;
    
    beforeEach(function(){
      scope.configObj = {url: "test-phone.json"};
      successPhoneLinkFn = $compile('<div bb-phone-details template-url="directives/BigData/phoneDetails.tpl.html" config="configObj"></div>');
      errorPhoneLinkFn = $compile('<div bb-phone-details template-url="directives/BigData/phoneDetails.tpl.html" config="configObj"></div>');
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should contain the correct scope parameters based upon the configuration file', function(){
      successPhoneLinkedDOM = successPhoneLinkFn(scope);
      //apply needed, because the directive is watching the config for changes.
      //the directive’s watch would never fire if this apply was not present.
      scope.$apply();
      //flush function will execute the $httpBackend functions that have
      //successfully matched. This will throw an error if nothing
      //matches.
      $httpBackend.flush();
      var phoneScope = successPhoneLinkedDOM.isolateScope();
      expect(phoneScope.phone.age).toBe(1);
      expect(phoneScope.phone.id).toBe("xxx-xxx-xxxx");
      expect(phoneScope.phone.imageUrl).toBe("testPhone.jpg");
      expect(phoneScope.phone.name).toBe("Amazing Phone");
      expect(phoneScope.phone.snippet).toBe("This is a Super Duper Phone");
    });

    it('should contain a phone object that has only an error value', function(){
      scope.configObj.url = "error.json";
      errorPhoneLinkedDOM = errorPhoneLinkFn(scope);
      scope.$apply();
      $httpBackend.flush();
      var phoneScope = errorPhoneLinkedDOM.isolateScope();
      expect(phoneScope.phone.error).toBe('no file exists');
      expect(phoneScope.phone.age).toBe(undefined);
    });

    it('should request for new data when the config file changes', function(){
      var successPhoneLinkedDOM = successPhoneLinkFn(scope);
      scope.$apply();
      $httpBackend.flush();
      scope.configObj.url = 'test-phone2.json';
      //force the direcitve to go throught a diegest cycle, which should fire a watch function
      //which should request for new data.
      scope.$apply();
      $httpBackend.flush();
      var phoneScope = successPhoneLinkedDOM.isolateScope();
      expect(phoneScope.phone.age).toBe(2);
      expect(phoneScope.phone.id).toBe("yyy-xxx-xxxx");
      expect(phoneScope.phone.imageUrl).toBe("testPhone2.jpg");
      expect(phoneScope.phone.name).toBe("Cool Phone");
      expect(phoneScope.phone.snippet).toBe("This is a Super Amazing Phone");
    });
  });
  
  /*
    This test showcases how each individual directive in the DOM will control its own 
    requests for data.
  */
  describe('Rendering many bbPhoneDetails directives in the DOM', function(){
    
    var phoneDOM;

    beforeEach(function(){

      $httpBackend.whenGET('test1.json').respond(404);
      $httpBackend.whenGET('test2.json').respond(404);

      scope.phones = [
        {
            "id": "test1", 
            "name": "Motorola XOOM\u2122 with Wi-Fi"
        },
        {
            "id": "test2", 
            "name": "MOTOROLA XOOM\u2122"
        }, 
        {
            "id": "test-phone", 
            "name": "Super Duper Phone"
        }];
      
      var phoneDivs = angular.element(
        '<div class="mainDiv">' +
          '<div ng-repeat="phone in phones" bb-phone-details template-url="directives/BigData/phoneDetails.tpl.html" config="{url: phone.id + \'.json\'}"></div>' + 
        '</div>');

      phoneDOM = $compile(phoneDivs)(scope);
      //apply needed, because the directive is watching the config for changes.
      //this watch would never fire if the apply was not present.
      scope.$apply();
      $httpBackend.flush();
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should contain 3 phone DOM elements which have the correct scope values', function(){
      var phones = phoneDOM.children();
      expect(phones.length).toBe(3);
      expect(angular.element(phones[0]).isolateScope().phone.error).toBe('no file exists');
      expect(angular.element(phones[1]).isolateScope().phone.error).toBe('no file exists');
      var successPhoneScope = angular.element(phones[2]).isolateScope();
      expect(successPhoneScope.phone.age).toBe(1);
      expect(successPhoneScope.phone.id).toBe("xxx-xxx-xxxx");
      expect(successPhoneScope.phone.imageUrl).toBe("testPhone.jpg");
      expect(successPhoneScope.phone.name).toBe("Amazing Phone");
      expect(successPhoneScope.phone.snippet).toBe("This is a Super Duper Phone");
    });
  });

});