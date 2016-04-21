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

                return $http.get('http://sdis-upload.grabit.mk/api/institution').then(function(result) {
                    return result.data;
                });

            },

            getInstitutionByMunicipality: function(municipalityId) {
                //NEED TO BE UPDATED
                return [{
                    "name": "ГУЦ",
                    "id": "1"
                }, {
                    "name": "ОРЦЕ НИКОЛОВ",
                    "id": "2"
                }];

            },

            getDistinctSchooldYearQ1: function(array) {
                var flags = [],
                    output = [],
                    l = array.length,
                    i;
                for (i = 0; i < l; i++) {
                    if (flags[array[i].schoolYear]) continue;
                    flags[array[i].schoolYear] = true;
                    output.push(array[i].schoolYear);
                }
                return output;
            },

            getDistinctNationalityQ3: function(array) {
                array = this.getAllNationalitiesQ3(array);
                var flags = [],
                    output = [],
                    l = array.length,
                    i;
                for (i = 0; i < l; i++) {
                    if (flags[array[i].nationality]) continue;
                    flags[array[i].nationality] = true;
                    output.push(array[i].nationality);
                }
                return output;
            },

            getAllNationalitiesQ3: function(array) {
                var output = [],
                    l = array.length,
                    i;
                for (i = 0; i < l; i++) {
                    var school = array[i];
                    for (var j = 0; j < school.nationalities.length; j++) {
                        output.push(school.nationalities[j]);
                    }
                }
                return output;
            },

            getDistinctSchoolsQ3: function(array) {
                var flags = [],
                    output = [],
                    l = array.length,
                    i;
                for (i = 0; i < l; i++) {
                    if (flags[array[i].schoolId]) continue;
                    flags[array[i].schoolId] = true;
                    output.push({
                        name: array[i].schoolName,
                        id: array[i].schoolId
                    });
                }
                return output;
            },

            getYears: function() {
                //NEED TO BE UPDATED
                return [{
                    "id": "1",
                    "label": "2011/2012"
                }, {
                    "id": "2",
                    "label": "2012/2013"
                }, {
                    "id": "3",
                    "label": "2013/2014"
                },{
                    "id": "4",
                    "label": "2014/2015"
                },{
                    "id": "5",
                    "label": "2015/2016"
                }, {
                    "id": "6",
                    "label": "2016/2017"
                } ];
            }

        }
    });