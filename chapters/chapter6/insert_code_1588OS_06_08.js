it('should contain a phone object that has only an error value', function(){
      scope.configObj.url = "error.json";
      errorPhoneLinkedDOM = errorPhoneLinkFn(scope);
      scope.$apply();
      $httpBackend.flush();
      var phoneScope = errorPhoneLinkedDOM.isolateScope();
      expect(phoneScope.phone.error).toBe('no file exists');
      expect(phoneScope.phone.age).toBe(undefined);
});
