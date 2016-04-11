'use strict';

/**
 * @ngdoc filter
 * @name skillsApp.filter:capitalize
 * @function
 * @description
 * # capitalize
 * Filter in the skillsApp.
 */
angular.module('skillsApp')
  .filter('capitalize', function () {
    return function (input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
  });
