'use strict';

/**
 * @ngdoc function
 * @name skillsApp.controller:StudentsCtrl
 * @description
 * # StudentsCtrl
 * Controller of the skillsApp
 */
angular.module('skillsApp')
  .controller('StudentsCtrl', function ($scope, $location) {
    	
    	$scope.goTo = function(url){
    		$location.path(url);
    	}
  });
