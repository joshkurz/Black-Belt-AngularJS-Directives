describe('stopwatch', function() {

  it('have three stopwatches on the page', function() {
    browser.get('http://localhost:8080/dist/#/stopwatch');
    var time = element(by.repeater('options in stopwatches').row(0).column('elapsedTime'));
    expect(time.getText()).toEqual('0:0:0:0');
    var time1 = element(by.repeater('options in stopwatches').row(1).column('elapsedTime'));
    expect(time1.getText()).toEqual('0:0:0:0');
    var time2 = element(by.repeater('options in stopwatches').row(2).column('elapsedTime'));
    expect(time2.getText()).toEqual('0:0:0:0');
  });
  
});