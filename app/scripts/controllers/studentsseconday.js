'use strict';

/**
 * @ngdoc function
 * @name skillsApp.controller:StudentssecondayCtrl
 * @description
 * # StudentssecondayCtrl
 * Controller of the skillsApp
 */
angular.module('skillsApp')
    .controller('StudentssecondayCtrl', function($scope, $http, utility, $filter, QUESTIONS_MK, ngTableParams,$translate) {
        var vm = this;

        vm.hasData = false;
        vm.isLoading = false;
        vm.tableData = null;

        vm.filter = {};

        //Институции
        vm.filter.institution = [];
        vm.institutionSettings = {
            enableSearch: true,
            displayProp: 'name',
            idProp: 'id',
            externalIdProp: ''
        };
        vm.institutionFilter = '';
        vm.institutionSettingsText = {
            buttonDefaultText: 'Изберете институција',
            checkAll: 'Изберете ги сите',
            uncheckAll: 'Поништете го изборот',
            selectionCount: 'избрани',
            dynamicButtonTextSuffix: 'избрани',
            searchPlaceholder: 'Пребарај'
        };

        utility.getInstitution().then(function(data) {
            //ова се сите институции за да се филтрираат
            vm.institutions = data.response;
            //ова се филтрираните институции за приказ (првично поставени на сите институции)
            vm.institutionsF = data.response;
        });

        //Општини
        vm.filter.municipality = [];
        vm.municipalitySettings = {
            enableSearch: true,
            displayProp: 'name',
            externalIdProp: ''
        };
        vm.municipalityEvents = {
            onItemSelect: function() {
                vm.filterInstitions();
            },
        }
        vm.municipalityFilter = '';
        vm.municipalitySettingsText = {
            buttonDefaultText: 'Изберете Општина',
            checkAll: 'Изберете ги сите',
            uncheckAll: 'Поништете го изборот',
            selectionCount: 'избрани',
            dynamicButtonTextSuffix: 'избрани',
            searchPlaceholder: 'Пребарај'
        };

        utility.getMunicipality().then(function(data) {
            vm.municipalities = data.response;
        });


        //Години
        vm.filter.year = [];
        vm.yearSettings = {
            //enableSearch: true,,
            externalIdProp: ''
        };
        vm.yearFilter = '';
        vm.yearSettingsText = {
            buttonDefaultText: 'Изберете Година',
            checkAll: 'Изберете ги сите',
            uncheckAll: 'Поништете го изборот',
            selectionCount: 'избрани',
            dynamicButtonTextSuffix: 'избрани',
            searchPlaceholder: 'Пребарај'
        };

        vm.years = utility.getYears();

        vm.filterInstitions = function() {

            var tmp = [];

            //Filter Institutions here
            for (var i = vm.institutions.length - 1; i >= 0; i--) {
                for (var j = vm.filter.municipality.length - 1; j >= 0; j--) {

                    if (vm.institutions[i].municipalityId == vm.filter.municipality[j].id) {
                        tmp.push(vm.institutions[i]);
                    }
                }
            }
            vm.institutionsF = tmp;
        }

        //Прашања

        vm.questions = QUESTIONS_MK.apisecondary;
        vm.filter.question = vm.questions[0];

        vm.getData = function(filters) {
            vm.isLoading = true;
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
                vm.isLoading = false;

                vm.tableData = data.response;

                if (vm.tableData == undefined) {
                    console.log("NO DATA");
                    vm.hasData = false;
                } else {

                    vm.hasData = true;

                    vm.gpr2Table = new ngTableParams({
                        page: 1,
                        count: 10
                    }, {
                        total: vm.tableData.length,
                        getData: function($defer, params) {
                            var filter = params.filter();
                            var sorting = params.sorting();
                            var count = params.count();
                            var page = params.page();
                            $defer.resolve(vm.tableData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    });

                }


            }).
            error(function(data, status, headers, config) {
                vm.isLoading = false;
                vm.hasData = false;
            });

        }


        vm.gpr2 = [];
        vm.gpr2.selectedSchool = vm.filter.institution[0];
        vm.chartGpr2 = function() {

            vm.gpr2.labels = [];
            vm.gpr2.series = [];
            vm.gpr2.data = [];

            for (var i = vm.tableData.length - 1; i >= 0; i--) {
                if (vm.tableData[i].schoolId == vm.gpr2.selectedSchool.id) {
                    // vm.gpr2.data.push()

                    for (var j = vm.tableData[i].years.length - 1; j >= 0; j--) {

                        vm.gpr2.series.push(vm.tableData[i].years[j].schoolYear);
                        var tmp = [];

                        for (var k = vm.tableData[i].years[j].programmes.length - 1; k >= 0; k--) {

                            vm.gpr2.labels.push(vm.tableData[i].years[j].programmes[k].programmeName);
                            tmp.push(vm.tableData[i].years[j].programmes[k].studentsEnrolled);

                        }
                        vm.gpr2.data.push(tmp);

                    }

                }
            }

        }

        vm.calcPercent = function(applied,enrolled){
            var percent = (100 * enrolled)/applied;
            return percent;
        };

    });