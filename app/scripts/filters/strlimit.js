'use strict';

/**
 * @ngdoc filter
 * @name skillsApp.filter:strlimit
 * @function
 * @description
 * # strlimit
 * Filter in the skillsApp.
 */
angular.module('skillsApp')
  .filter('strlimit', function () {
    return function (input) {
      return 'strlimit filter: ' + input;
    };
  });
