describe("bbStockChart live data interaction", function () {
	beforeEach(function() {
      browser.get('/dist/#/stockchart');
    });

    it("should contain a d3 chart", function () {
      var elements = $$('.chart');
      expect(elements.count()).toBe(1);
    });

    it("should contain 6 path elements with the correct class names", function () {
      var orcl = $$('.ORCL'),
          znga = $$('.ZNGA'),
          ea = $$('.EA'),
          f = $$('.F'),
          fb = $$('.FB'),
          tri = $$('.TRI');

      expect(orcl.count()).toBe(1);
      expect(znga.count()).toBe(1);
      expect(ea.count()).toBe(1);
      expect(f.count()).toBe(1);
      expect(fb.count()).toBe(1);
      expect(tri.count()).toBe(1);
    });

    it('should add/remove GOOG to the graph when the add/remove button is clicked', function() {
      var googAddBtn = element(
            by.repeater('ticker in addTickers').
            row(0)),
          googRemoveBtn = element(
            by.repeater('ticker in tickers').
            row(6)),
          goog = $$('.GOOG');
          
      expect(goog.count()).toEqual(0);
      googAddBtn.click();
      expect(goog.count()).toEqual(1);
      googRemoveBtn.click();
      expect(goog.count()).toEqual(0);
    });
});
