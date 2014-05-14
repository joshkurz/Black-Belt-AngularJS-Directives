describe("hello-bb-protractor", function () {
  describe("index", function () {
    it("should display the correct title", function () {
      browser.get('/dist/#');
      expect(browser.getTitle()).toBe('Black Belt Directives');
    });
  });
});