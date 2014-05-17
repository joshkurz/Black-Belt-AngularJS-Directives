app.service('Watch', function($rootScope) {
  return {
    run: function() {
      $rootScope.$watch('data', function(newVal, oldVal) {
    },true);
    //the digest is here because of the jsPerf test. We are using
      this run function to mimic a real environment.
    $rootScope.$digest();
  }
};
});
