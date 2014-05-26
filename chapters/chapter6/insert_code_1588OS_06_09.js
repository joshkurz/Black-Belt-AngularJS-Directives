it('should request for new data when the config file changes', function(){
      var successPhoneLinkedDOM = successPhoneLinkFn(scope);
      scope.$apply();
      $httpBackend.flush();
      scope.configObj.url = 'test-phone2.json';
      //force the directive to go through a digest cycle, which should fire a watch function
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
