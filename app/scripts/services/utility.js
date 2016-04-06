'use strict';

/**
 * @ngdoc service
 * @name skillsApp.utility
 * @description
 * # utility
 * Service in the skillsApp.
 */
angular.module('skillsApp')
    .factory("utility", function($http) {
        return {

        	//GET ALL NATIONALITIES
            getNationality: function() {


                // $http.get('http://sdis-upload.grabit.mk/api/nationalities').
                // success(function(data, status, headers, config) {
                //     return data;
                // }).
                // error(function(data, status, headers, config) {

                // });

                return [{
                    nationalityId: 1,
                    name: 'Македонска'
                }, {
                    nationalityId: 2,
                    name: 'Албанска'
                }];
            },


            //GET ALL MUNICIPALITIES
            getMunicipality: function() {

                return [{
                    municipalityId: 1,
                    name: 'Аеродром'
                }, {
                    municipalityId: 2,
                    name: 'Бутел'
                }];

            }
        }
    });