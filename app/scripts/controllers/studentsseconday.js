'use strict';

/**
 * @ngdoc function
 * @name skillsApp.controller:StudentssecondayCtrl
 * @description
 * # StudentssecondayCtrl
 * Controller of the skillsApp
 */
angular.module('skillsApp')
    .controller('StudentssecondayCtrl', function($scope, $http, utility, $filter, QUESTIONS_MK, ngTableParams) {


        $scope.hasData = false;
        $scope.isLoading = false;
        $scope.tableData = null;

        $scope.filter = {};

        //Институции
        $scope.filter.institution = [];
        $scope.institutionSettings = {
            enableSearch: true,
            displayProp: 'name',
            idProp: 'id',
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
            //ова се сите институции за да се филтрираат
            $scope.institutions = data.response;
            //ова се филтрираните институции за приказ (првично поставени на сите институции)
            $scope.institutionsF = data.response;
        });

        //Општини
        $scope.filter.municipality = [];
        $scope.municipalitySettings = {
            enableSearch: true,
            displayProp: 'name',
            externalIdProp: ''
        };
        $scope.municipalityEvents = {
            onItemSelect: function() {
                $scope.filterInstitions();
            },
        }
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

        $scope.filterInstitions = function() {

            var tmp = [];

            //Filter Institutions here
            for (var i = $scope.institutions.length - 1; i >= 0; i--) {
                for (var j = $scope.filter.municipality.length - 1; j >= 0; j--) {

                    if ($scope.institutions[i].municipalityId == $scope.filter.municipality[j].id) {
                        tmp.push($scope.institutions[i]);
                    }

                }
            }

            $scope.institutionsF = tmp;

        }


        //Прашања

        $scope.questions = QUESTIONS_MK.apisecondary;

        $scope.filter.question = $scope.questions[0];

        $scope.getData = function(filters) {

            $scope.isLoading = true;

            //http://sdis-upload.grabit.mk/apisecondary/gpr/1?institutionId[]=1133&institutionId[]=1246&institutionId[]=1152&years[]=3&years[]=4&years[]=6&years[]=2

            //креирање на урл-то со соодветните параметри
            var url = QUESTIONS_MK.BASE_URL;
            url += filters.question.url + "?";

            //моментално се хардкодирани дур не добиеме листа од институции
            var institutions = filters.institution;

            var years = filters.year;

            for (var i = institutions.length - 1; i >= 0; i--) {
                url += "institutionId[]=" + institutions[i].id + "&";
            }

            for (var i = years.length - 1; i >= 0; i--) {
                url += "years[]=" + years[i].id + "&";
            }

            // бришење на последниот '&'
            url = url.substring(0, url.length - 1);

            console.log(url);

            //Повик
            //ова е за да не го прави повикот за време на тестирање
            // return 0;

            $http.get(url).
            success(function(data, status, headers, config) {
                $scope.isLoading = false;

                $scope.tableData = data.response;

                if ($scope.tableData == undefined) {
                    console.log("NO DATA");
                    $scope.hasData = false;
                } else {

                    $scope.hasData = true;

                    $scope.gpr2Table = new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                        total: $scope.tableData.length,
                        getData: function($defer, params) {
                            var filter = params.filter();
                            var sorting = params.sorting();
                            var count = params.count();
                            var page = params.page();
                            $defer.resolve($scope.tableData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    });

                }


            }).
            error(function(data, status, headers, config) {

                $scope.isLoading = false;
                $scope.hasData = false;


            });

        }


        $scope.gpr2 = [];
        $scope.gpr2.selectedSchool = $scope.filter.institution[0];
        $scope.chartGpr2 = function() {

            $scope.gpr2.labels = [];
            $scope.gpr2.series = [];
            $scope.gpr2.data = [];

            for (var i = $scope.tableData.length - 1; i >= 0; i--) {
                if ($scope.tableData[i].schoolId == $scope.gpr2.selectedSchool.id) {
                    // $scope.gpr2.data.push()

                    for (var j = $scope.tableData[i].years.length - 1; j >= 0; j--) {

                        $scope.gpr2.series.push($scope.tableData[i].years[j].schoolYear);
                        var tmp = [];

                        for (var k = $scope.tableData[i].years[j].programmes.length - 1; k >= 0; k--) {

                            $scope.gpr2.labels.push($scope.tableData[i].years[j].programmes[k].programmeName);
                            tmp.push($scope.tableData[i].years[j].programmes[k].studentsEnrolled);

                        }
                        $scope.gpr2.data.push(tmp);

                    }

                }
            }

        }

    });