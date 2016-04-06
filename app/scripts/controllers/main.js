'use strict';

/**
 * @ngdoc function
 * @name skillsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the skillsApp
 */
angular.module('skillsApp')
  .controller('MainCtrl', function ($scope) {
    	
    	$scope.activeTab = true;

    	$scope.setActiveTab = function(id){
    		console.log('da');
    		$scope.activeTab = false;
    		console.log($scope.activeTab);
    	}



  });
