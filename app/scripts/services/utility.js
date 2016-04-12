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

            },

            getDistinctSchooldYearQ1: function(array) {
                var flags = [], output = [], l = array.length, i;
                for( i=0; i<l; i++) {
                    if(flags[array[i].schoolYear]) continue;
                    flags[array[i].schoolYear] = true;
                    output.push(array[i].schoolYear);
                }
                return output;
            },

            getDistinctNationalityQ3: function(array) {
                array = this.getAllNationalitiesQ3(array);
                var flags = [], output = [], l = array.length, i;
                for( i=0; i<l; i++) {
                    if(flags[array[i].nationality]) continue;
                    flags[array[i].nationality] = true;
                    output.push(array[i].nationality);
                }
                return output;
            },

            getAllNationalitiesQ3: function(array) {
                var output = [], l = array.length, i;
                for( i=0; i<l; i++) {
                    var school = array[i];
                    for(var j =0; j<school.nationalities.length; j++) {
                        output.push(school.nationalities[j]);
                    }
                }
                return output;
            },

            getDistinctSchoolsQ3: function(array) {
                var flags = [], output = [], l = array.length, i;
                for( i=0; i<l; i++) {
                    if(flags[array[i].schoolId]) continue;
                    flags[array[i].schoolId] = true;
                    output.push({name: array[i].schoolName, id: array[i].schoolId});
                }
                return output;
            },
        }
    });