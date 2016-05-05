'use strict';

/**
 * @ngdoc function
 * @name skillsApp.controller:StudentssecondayCtrl
 * @description
 * # StudentssecondayCtrl
 * Controller of the skillsApp
 */
angular.module('skillsApp')
    .controller('StudentssecondayCtrl', function($scope, $http, utility, $filter, QUESTIONS_MK, ngTableParams, $translate) {
        var vm = this;

        vm.hasData = false;
        vm.isLoading = false;
        vm.tableData = null;

        //Chart models
        vm.chart = {
            currentQuestion : null,
            currentSchool : null,
            currentSchoolId : '',
            currentYear: null,
            labels: [],
            data: [],
            series : [],
            schools :null,
            years: []
        };
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

                    vm.gprTable = new ngTableParams({
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

        //za charts od boki - moze ne treba ovoj del
        vm.gpr = [];
        vm.gpr.selectedSchool = vm.filter.institution[0];
        vm.chartgpr = function() {

            vm.gpr.labels = [];
            vm.gpr.series = [];
            vm.gpr.data = [];

            for (var i = vm.tableData.length - 1; i >= 0; i--) {
                if (vm.tableData[i].schoolId == vm.gpr.selectedSchool.id) {
                    // vm.gpr.data.push()

                    for (var j = vm.tableData[i].years.length - 1; j >= 0; j--) {

                        vm.gpr.series.push(vm.tableData[i].years[j].schoolYear);
                        var tmp = [];

                        for (var k = vm.tableData[i].years[j].programmes.length - 1; k >= 0; k--) {

                            vm.gpr.labels.push(vm.tableData[i].years[j].programmes[k].programmeName);
                            tmp.push(vm.tableData[i].years[j].programmes[k].studentsEnrolled);

                        }
                        vm.gpr.data.push(tmp);

                    }

                }
            }

        }

        vm.calcPercent = function(applied,enrolled){
            return (100 * enrolled)/applied;
        };


        //charts

        //function for getting chart
        vm.getChart = function() {
            switch(vm.filter.question) {
                case 1:
                    vm.getChart1();
                    break;
                case 2:
                    vm.getChart2();
                    break;
                case 3:
                    vm.getChart3();
                    break;
                case 4:
                    vm.getChart4();
                    break;
                case 5:
                    vm.getChart5();
                    break;
                case 6:
                    vm.getChart6();
                    break;
                case 7:
                    vm.getChart7();
                    break;
                case 8:
                    vm.getChart8();
                    break;
                default:
                    break;
            }
        };

        //when user selects a school from the dropdown in the chart tab
        vm.schoolSelection = function(schoolObj){
            vm.chart.currentSchool = schoolObj;
            vm.chart.SelectedYears = null;
            vm.chart.SelectedProgram = null;
            //vm.setYearsDropdown(vm.chart.currentSchoolId);
        };
        //when user selects a year from the dropdown in the chart tab
        vm.yearSelection = function(yearObj){
            vm.chart.currentYear = yearObj;
            vm.chart.SelectedProgram = null;
        };

        vm.getChart1 = function() {
            vm.chart.schools = null;
        };

        vm.drawChartQ1 = function(school){
            vm.chart.labels = [];
            vm.chart.data = [[]];
            vm.chart.series=[$translate.instant("CHART_PERCENT_ENROLLED")];
            for(var i=0; i < school.years.length; i++){
                vm.chart.labels.push(school.years[i].schoolYear);

                if(school.years[i].studentsApplied == null)
                    vm.chart.data[0].push([100]);
                else
                    vm.chart.data[0].push(school.years[i].studentsApplied, school.years[i].studentsEnrolled);

            }
           
        };

        vm.getChart2 = function() {
            vm.chart.schools = null;
        };

        vm.drawChartQ2 = function(schoolYear){
            vm.chart.labels = [];
            vm.chart.data = [];
            for (var i = 0; i < schoolYear.programmes.length; i++) {
                vm.chart.labels.push(schoolYear.programmes[i].programmeName);
                vm.chart.data.push(schoolYear.programmes[i].studentsEnrolled);
            }
            
        };

        vm.getChart3 = function() {
            vm.chart.schools = null;
        };

        vm.drawChartQ3 = function(schoolYear){
            vm.chart.labels = [];
            vm.chart.data = [];
            for (var i = 0; i < schoolYear.nationality.length; i++) {
                vm.chart.labels.push(schoolYear.nationality[i].nationalityName);
                vm.chart.data.push(schoolYear.nationality[i].studentsEnrolled);
            }
            
        };
        /*vm.getYearsPerSchool = function(data, school){
            var item = null;
            for (var i = 0; i < data.length; i++) {
                if(data[i].schoolName == school){
                    item = data[i];
                    break;
                }
            }
            return item;
        };*/
        vm.getChart4 = function() {
            vm.chart.schools = null;
        };

        vm.drawChartQ4 = function(program){
            vm.chart.labels = [];
            vm.chart.data = [];
            for (var i = 0; i < program.nationality.length; i++) {
                vm.chart.labels.push(program.nationality[i].nationalityName);
                vm.chart.data.push(program.nationality[i].studentsEnrolled);
            }
        };

        vm.getChart5 = function() {
            vm.chart.schools = null;
        };

        vm.drawChartQ5 = function(schoolYear){
            vm.chart.data = [];
            vm.chart.labels = [$translate.instant("GPR_5_TH_FEMALE"), $translate.instant("GPR_5_TH_MALE")];
            vm.chart.series = [$translate.instant("GPR_5_TH_FEMALE"), $translate.instant("GPR_5_TH_MALE")];
            if (schoolYear.gender.length < 2){
                if(schoolYear.gender[0].gender == 'male'){
                    vm.chart.data = [0, schoolYear.gender[0].studentsEnrolled];
                }
                else {
                    vm.chart.data = [schoolYear.gender[0].studentsEnrolled, 0];
                }

            }
        };

        vm.getChart6 = function() {
            vm.chart.schools = null;
            vm.chart.data = [];
        };

        vm.drawChartQ6 = function(program){
            vm.chart.data = [];
            vm.chart.labels = [$translate.instant("GPR_5_TH_FEMALE"), $translate.instant("GPR_5_TH_MALE")];
            vm.chart.series = [$translate.instant("GPR_5_TH_FEMALE"), $translate.instant("GPR_5_TH_MALE")];
            if (program.gender.length < 2){
                if(program.gender[0].gender == 'male'){
                    vm.chart.data = [0, program.gender[0].studentsEnrolled];
                }
                else {
                    vm.chart.data = [program.gender[0].studentsEnrolled, 0];
                }

            }
            else {
                vm.chart.data = [program.gender[0].studentsEnrolled, program.gender[1].studentsEnrolled];
            }
        };


        vm.getChart7 = function() {
            vm.chart.schools = null;
            vm.chart.data = [];
        };

        vm.drawChartQ7 = function(schoolYear){
            vm.chart.data = [ schoolYear.GraduatesNumber, schoolYear.studentsEnrolled , schoolYear.EmployedNumber, 
            schoolYear.UnemployedNumber, schoolYear.UnknownStatusNumber];
            vm.chart.series = vm.chart.labels = [$translate.instant("GPR_7_GRADUATED"), $translate.instant("GPR_7_ENROLLED"),$translate.instant("GPR_7_EMPLOYED"),
             $translate.instant("GPR_7_UNEMPLOYED"), $translate.instant("GPR_7_UNKNOWN")];

        };


        vm.getChart8 = function() {
            vm.chart.data = [];
            vm.chart.schools = null;
        };


        vm.drawChartQ8 = function(program){
            vm.chart.data = [ program.GraduatesNumber, program.studentsEnrolled , program.EmployedNumber, 
            program.UnemployedNumber, program.UnknownStatusNumber];
            vm.chart.series = vm.chart.labels = [$translate.instant("GPR_7_GRADUATED"), $translate.instant("GPR_7_ENROLLED"),$translate.instant("GPR_7_EMPLOYED"),
             $translate.instant("GPR_7_UNEMPLOYED"), $translate.instant("GPR_7_UNKNOWN")];

        };
    });