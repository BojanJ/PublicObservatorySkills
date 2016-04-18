'use strict';

/**
 * @ngdoc function
 * @name skillsApp.controller:StudentssecondayCtrl
 * @description
 * # StudentssecondayCtrl
 * Controller of the skillsApp
 */
angular.module('skillsApp')
    .controller('StudentssecondayCtrl', function($scope, $http, utility) {


        $scope.filter = {};



        utility.getMunicipality().then(function(data) {
            $scope.municipalities = data.response;
            $scope.filter.municipality = $scope.municipalities[0];
        });

        utility.getInstitution().then(function(data) {
            $scope.institutions = data.response;
            $scope.filter.institution = $scope.institutions[0];
        });

        $scope.filterInstitutions = function(ids) {
            for (var i = $scope.institutions.length - 1; i >= 0; i--) {
                // for (var j = ids.length - 1; j >= 0; j--) {
                        
                // }
            }
        }

        $scope.years = utility.getYears();
        $scope.filter.year = [$scope.years[0]];

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];

        $scope.series = ['Series A', 'Series B'];

        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];

        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };



    });