'use strict';

/**
 * @ngdoc function
 * @name skillsApp.controller:StudentspostsecondayCtrl
 * @description
 * # StudentspostsecondayCtrl
 * Controller of the skillsApp
 */
angular.module('skillsApp')
    .controller('StudentspostsecondayCtrl', function($scope, $http, utility, $filter, QUESTIONS_MK, ngTableParams) {


        $scope.hasData = false;
        $scope.isLoading = false;
        $scope.tableData9 = null;

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

        $scope.questions = QUESTIONS_MK.apiuniversity;

        // $scope.filter.question = $scope.questions[0];



        //

        $scope.getData = function(filter) {

            $scope.isLoading = true;
            //Селектираното прашање
            $scope.gpr = filter.question.gpr;

            $scope.isLoading = true;

            //http://sdis-upload.grabit.mk/apisecondary/gpr/1?institutionId[]=1133&institutionId[]=1246&institutionId[]=1152&years[]=3&years[]=4&years[]=6&years[]=2

            //креирање на урл-то со соодветните параметри
            var url = QUESTIONS_MK.BASE_URL;
            url += filter.question.url + "?";

            //моментално се хардкодирани дур не добиеме листа од институции
            var institutions = filter.institution;

            var years = filter.year;

            for (var i = institutions.length - 1; i >= 0; i--) {
                url += "institutionId[]=" + institutions[i].id + "&";
            }

            for (var i = years.length - 1; i >= 0; i--) {
                url += "years[]=" + years[i].id + "&";
            }

            // бришење на последниот '&'
            url = url.substring(0, url.length - 1);

            //Финалното URL
            console.log(url);


            $http.get(url).
            success(function(data, status, headers, config) {

                console.log(data);


                //GPR9
                if ($scope.gpr == 9) {

                    $scope.isLoading = false;

                    $scope.tableData9 = data.response;

                    if ($scope.tableData9 == undefined) {
                        console.log("NO DATA");
                        $scope.hasData = false;
                    } else {

                        $scope.isLoading = false;
                        $scope.hasData = true;

                    }

                } else if ($scope.gpr == 10) {
                    

                    $scope.isLoading = false;

                    $scope.tableData10 = data.response;

                    if ($scope.tableData10 == undefined) {
                        console.log("NO DATA");
                        $scope.hasData = false;
                    } else {

                        $scope.isLoading = false;
                        $scope.hasData = true;

                    }


                } else if ($scope.gpr == 11) {
                    

                    $scope.isLoading = false;

                    $scope.tableData11 = data.response;

                    if ($scope.tableData11 == undefined) {
                        console.log("NO DATA");
                        $scope.hasData = false;
                    } else {

                        $scope.isLoading = false;
                        $scope.hasData = true;

                    }

                } else if ($scope.gpr == 12) {
                    

                    $scope.isLoading = false;

                    $scope.tableData12 = data.response;

                    if ($scope.tableData12 == undefined) {
                        console.log("NO DATA");
                        $scope.hasData = false;
                    } else {

                        $scope.isLoading = false;
                        $scope.hasData = true;

                    }

                } else if ($scope.gpr == 13) {
                    

                    $scope.isLoading = false;

                    $scope.tableData13 = data.response;

                    if ($scope.tableData13 == undefined) {
                        console.log("NO DATA");
                        $scope.hasData = false;
                    } else {

                        $scope.isLoading = false;
                        $scope.hasData = true;

                    }

                } else if ($scope.gpr == 14) {
                    

                    $scope.isLoading = false;

                    $scope.tableData14 = data.response;

                    if ($scope.tableData14 == undefined) {
                        console.log("NO DATA");
                        $scope.hasData = false;
                    } else {

                        $scope.isLoading = false;
                        $scope.hasData = true;

                    }

                } else if ($scope.gpr == 15) {
                    

                    $scope.isLoading = false;

                    $scope.tableData15 = data.response;

                    if ($scope.tableData15 == undefined) {
                        console.log("NO DATA");
                        $scope.hasData = false;
                    } else {

                        $scope.isLoading = false;
                        $scope.hasData = true;

                    }

                } else if ($scope.gpr == 16) {
                    

                    $scope.isLoading = false;

                    $scope.tableData16 = data.response;

                    if ($scope.tableData16 == undefined) {
                        console.log("NO DATA");
                        $scope.hasData = false;
                    } else {

                        $scope.isLoading = false;
                        $scope.hasData = true;

                    }

                } else if ($scope.gpr == 17) {
                    

                    $scope.isLoading = false;

                    $scope.tableData17 = data.response;

                    if ($scope.tableData17 == undefined) {
                        console.log("NO DATA");
                        $scope.hasData = false;
                    } else {

                        $scope.isLoading = false;
                        $scope.hasData = true;

                    }

                }


            }).
            error(function(data, status, headers, config) {

                $scope.isLoading = false;
                $scope.hasData = false;


            });


            $scope.calcPercent = function(a, b) {
                var res = (a * 100) / (b);
                return Math.floor(res);
            }

            $scope.getGender = function(g) {
            	if (g == "male"){
            		return "Машки";
            	} else {
            		return "Женски";
            	}
            }



        }





    });