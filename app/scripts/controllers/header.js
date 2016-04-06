'use strict';

/**
 * @ngdoc function
 * @name skillsApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the skillsApp
 */
angular.module('skillsApp')
  .controller('HeaderCtrl', function ($scope, localStorageService, $translate) {


        var langName = 'mk-MK'

        $scope.Languages = [{
            'name': 'Македонски',
            'img': 'flag-mk.png'
        }, {
            'name': 'Албански',
            'img': 'flag-al.png'
        }, {
            'name': 'Англиски',
            'img': 'flag-uk.png'
        }];

        if (localStorageService.get('language')) {
            $scope.active = localStorageService.get('language');

            if ($scope.active == 0) {
                langName = 'mk-MK';
            } else if ($scope.active == 1) {
                langName = 'sq-SQ';
            } else if ($scope.active == 2){
                langName = 'en-US';
            } else {
            	langName = 'mk-MK';
            }

            $translate.use(langName);

        } else {
        	langName = 'mk-MK';
        	$translate.use(langName);
            $scope.active = 0;
        }

        $scope.changeLang = function(lang) {

            localStorageService.set('language', lang);

            if (lang == 0) {
                langName = 'mk-MK';
            } else if (lang == 1) {
                langName = 'sq-SQ';
            } else if (lang == 2){
                langName = 'en-US';
            } else {
            	langName = 'mk-MK';
            }

            $translate.use(langName);
            $scope.active = lang;

        }



    });

