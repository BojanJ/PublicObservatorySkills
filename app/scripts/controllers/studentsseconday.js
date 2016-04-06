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


        $scope.itemArray = utility.getNationality();

        // $scope.itemArray = [{
        //     id: 1,
        //     name: 'first'
        // }, {
        //     id: 2,
        //     name: 'second'
        // }, {
        //     id: 3,
        //     name: 'third'
        // }, {
        //     id: 4,
        //     name: 'fourth'
        // }, {
        //     id: 5,
        //     name: 'fifth'
        // }, ];

        $scope.selected = {
            value: $scope.itemArray[0]
        };


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