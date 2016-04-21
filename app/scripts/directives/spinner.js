'use strict';

/**
 * @ngdoc directive
 * @name skillsApp.directive:spinner
 * @description
 * # spinner
 */
angular.module('skillsApp')
  .directive('spinner', function () {
    return {
      template: '<div class="text-center" style="color: #aaa"><h1><span class="fa fa-spinner fa-spin"></span></h1></div>',
      restrict: 'E'
    };
  });