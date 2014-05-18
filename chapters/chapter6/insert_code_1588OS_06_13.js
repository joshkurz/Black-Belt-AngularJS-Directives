describe("bbBarChart live data interaction", function () {
    beforeEach(function() {
      browser.get('/dist/#/mediaelement');
    });

    it("should contain a typeahead element and a mediaelement which communicate via a barChart", function () {
      var typeahead = element(by.model('result')),
          bars = $$('.menuBar'),
          mediaelementSource = $$('.youtubeSourceObj');

      expect(bars.count()).toEqual(0);
      expect(mediaelementSource.count()).toEqual(0);
      typeahead.sendKeys('AngularJS');
      expect(bars.count()).toEqual(30);
      bars.first().click();
      expect(mediaelementSource.count()).toEqual(1);
    });

});
