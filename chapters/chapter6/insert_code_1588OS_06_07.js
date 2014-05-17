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
