describe("bbStockChart live data interaction", function () {
    it("should contain a d3 chart", function () {
      browser.get('/dist/#/stockchart');
      var elements = $$('.chart');
      expect(elements.count()).toBe(1);
      var chartHtml = elements.getInnerHtml();
      expect(chartHtml).toBe('<div></div>')
    });
});