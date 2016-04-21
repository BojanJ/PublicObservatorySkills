'use strict';

/**
 * @ngdoc function
 * @name skillsApp.controller:StudentssecondayCtrl
 * @description
 * # StudentssecondayCtrl
 * Controller of the skillsApp
 */
angular.module('skillsApp')
    .controller('StudentssecondayCtrl', function($scope, $http, utility, $filter, QUESTIONS_MK) {


        $scope.filter = {};


        //Институции
        $scope.filter.institution = [];
        $scope.institutionSettings = {
            enableSearch: true,
            displayProp: 'name',
            idProp: 'faxId',
            externalIdProp: ''
        };
        $scope.institutionFilter = '';
        $scope.institutionSettingsText = {
            buttonDefaultText: 'Изберете институција',
            checkAll: 'Изберете ги сите',
            uncheckAll: 'Поништете го изборот',
            selectionCount: 'избрани',
            dynamicButtonTextSuffix: 'избрани',
            searchPlaceholder: 'Пребарај'
        };

        utility.getInstitution().then(function(data) {
            $scope.institutions = data;
        });


        //Општини
        $scope.filter.municipality = [];
        $scope.municipalitySettings = {
            enableSearch: true,
            displayProp: 'name',
            externalIdProp: ''
        };
        $scope.municipalityFilter = '';
        $scope.municipalitySettingsText = {
            buttonDefaultText: 'Изберете Општина',
            checkAll: 'Изберете ги сите',
            uncheckAll: 'Поништете го изборот',
            selectionCount: 'избрани',
            dynamicButtonTextSuffix: 'избрани',
            searchPlaceholder: 'Пребарај'
        };

        utility.getMunicipality().then(function(data) {
            $scope.municipalities = data.response;
        });


        //Години
        $scope.filter.year = [];
        $scope.yearSettings = {
            //enableSearch: true,,
            externalIdProp: ''
        };
        $scope.yearFilter = '';
        $scope.yearSettingsText = {
            buttonDefaultText: 'Изберете Година',
            checkAll: 'Изберете ги сите',
            uncheckAll: 'Поништете го изборот',
            selectionCount: 'избрани',
            dynamicButtonTextSuffix: 'избрани',
            searchPlaceholder: 'Пребарај'
        };

        $scope.years = utility.getYears();


        //Прашања

        $scope.questions = QUESTIONS_MK.apisecondary;

        $scope.filter.question = $scope.questions[0];

        $scope.getData = function(filters) {
            //http://sdis-upload.grabit.mk/apisecondary/gpr/1?institutionId[]=1133&institutionId[]=1246&institutionId[]=1152&years[]=3&years[]=4&years[]=6&years[]=2

            //креирање на урл-то со соодветните параметри
            var url = QUESTIONS_MK.BASE_URL;
            url += filters.question.url + "?";

            //моментално се хардкодирани дур не добиеме листа од институции
            var institutions = ["1133", "1246", "1152"];

            var years = filters.year;

            for (var i = institutions.length - 1; i >= 0; i--) {
                url += "institutionId[]=" + institutions[i] + "&";
            }

            for (var i = years.length - 1; i >= 0; i--) {
                url += "years[]=" + years[i].id + "&";
            }

            // бришење на последниот '&'
            url = url.substring(0, url.length - 1);


            //Повик
            $http.get(url).
            success(function(data, status, headers, config) {
                console.log('Data', data);
            }).
            error(function(data, status, headers, config) {

            });

        }

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