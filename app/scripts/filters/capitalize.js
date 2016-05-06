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
      var subParts = input.split('-');
      var result = input;
      if(subParts.length > 1) {
      	result = "";
	    for(var i=0; i<subParts.length; i++) {
	      	result += subParts[i].charAt(0).toUpperCase() + subParts[i].substr(1).toLowerCase();
	      	if(i < subParts.length-1) result+="-";
	    }
	  }
	  else result = input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
      return (!!result) ? result : '';
    };
  });
