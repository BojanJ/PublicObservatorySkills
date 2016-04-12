'use strict';

describe('Filter: strlimit', function () {

  // load the filter's module
  beforeEach(module('skillsApp'));

  // initialize a new instance of the filter before each test
  var strlimit;
  beforeEach(inject(function ($filter) {
    strlimit = $filter('strlimit');
  }));

  it('should return the input prefixed with "strlimit filter:"', function () {
    var text = 'angularjs';
    expect(strlimit(text)).toBe('strlimit filter: ' + text);
  });

});
