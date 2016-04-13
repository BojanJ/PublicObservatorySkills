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

                return $http.get('http://sdis-upload.grabit.mk/api/nationalities').then(function(result) {
                    return result.data;
                });

            },

            //GET ALL MUNICIPALITIES
            getMunicipality: function() {

                return $http.get('http://sdis-upload.grabit.mk/api/municipalities').then(function(result) {
                    return result.data;
                });

            },

            //GET ALL INSTITUTIONS
            getInstitution: function() {

                return $http.get('http://sdis-upload.grabit.mk/api/municipalities').then(function(result) {
                    return result.data;
                });

            },

            getInstitutionByMunicipality: function(municipalityId) {
                //NEED TO BE UPDATED
                return [{
                    "name":"ГУЦ",
                    "id": "1"
                }, {
                    "name":"ОРЦЕ НИКОЛОВ",
                    "id": "2"
                }];

            },

            getYears: function() {
                //NEED TO BE UPDATED
                return [{
                    "name":"2015",
                    "year": "2015"
                }, {
                    "name":"2016",
                    "year": "2016"
                }, {
                    "name":"2017",
                    "year": "2017"
                }, ];
            }

        }
    });