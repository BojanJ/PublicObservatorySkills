'use strict';

/**
 * @ngdoc function
 * @name skillsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the skillsApp
 */
angular.module('skillsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
