'use strict';

/**
 * @ngdoc function
 * @name skillsApp.controller:StudentspostsecondayCtrl
 * @description
 * # StudentspostsecondayCtrl
 * Controller of the skillsApp
 */
angular.module('skillsApp')
    .controller('StudentspostsecondayCtrl', function($scope, $http, utility, $filter, QUESTIONS_MK, QUESTIONS_EN, ngTableParams, $translate) {


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

        $scope.getQuestions = function() {

            if ($translate.use() == 'mk-MK') {
                $scope.questions = QUESTIONS_MK.apiuniversity;
            } else if ($translate.use() == 'en-US') {
                $scope.questions = QUESTIONS_EN.apiuniversity;
            } else {
                $scope.questions = QUESTIONS_MK.apiuniversity;
            }

        }

        $scope.getQuestions();


        // $scope.filter.question = $scope.questions[0];

        //

        $scope.getData = function(filter) {

            $scope.isLoading = true;
            //Селектираното прашање
            $scope.gpr = filter.question.gpr;


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



                //GPR9
                if ($scope.gpr == 9) {

                    $scope.isLoading = false;

                    $scope.tableData9 = data.response;

                    if ($scope.tableData9 == undefined) {
                        console.log("NO DATA");
                        $scope.hasData = false;
                    } else {

                        $scope.graphInstitution = [];
                        for (var i = $scope.tableData9.length - 1; i >= 0; i--) {

                            for (var j = $scope.tableData9[i].university.length - 1; j >= 0; j--) {
                                $scope.graphInstitution = $scope.graphInstitution.concat($scope.tableData9[i].university[j].faculty);
                            }

                        }

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

                        $scope.graphInstitution = [];
                        for (var i = $scope.tableData10.length - 1; i >= 0; i--) {

                            for (var j = $scope.tableData10[i].university.length - 1; j >= 0; j--) {
                                $scope.graphInstitution = $scope.graphInstitution.concat($scope.tableData10[i].university[j].faculty);
                            }

                        }

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

                        $scope.graphInstitution = [];
                        for (var i = $scope.tableData11.length - 1; i >= 0; i--) {

                            for (var j = $scope.tableData11[i].university.length - 1; j >= 0; j--) {
                                $scope.graphInstitution = $scope.graphInstitution.concat($scope.tableData11[i].university[j].faculty);
                            }

                        }

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

                        $scope.graphInstitution = [];
                        for (var i = $scope.tableData12.length - 1; i >= 0; i--) {

                            for (var j = $scope.tableData12[i].university.length - 1; j >= 0; j--) {
                                $scope.graphInstitution = $scope.graphInstitution.concat($scope.tableData12[i].university[j].faculty);
                            }

                        }

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

                        $scope.graphInstitution = [];
                        for (var i = $scope.tableData13.length - 1; i >= 0; i--) {

                            for (var j = $scope.tableData13[i].university.length - 1; j >= 0; j--) {
                                $scope.graphInstitution = $scope.graphInstitution.concat($scope.tableData13[i].university[j].faculty);
                            }

                        }

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

                        $scope.graphInstitution = [];
                        for (var i = $scope.tableData14.length - 1; i >= 0; i--) {

                            for (var j = $scope.tableData14[i].university.length - 1; j >= 0; j--) {
                                $scope.graphInstitution = $scope.graphInstitution.concat($scope.tableData14[i].university[j].faculty);
                            }

                        }
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

                        $scope.graphInstitution = [];
                        for (var i = $scope.tableData15.length - 1; i >= 0; i--) {

                            for (var j = $scope.tableData15[i].university.length - 1; j >= 0; j--) {
                                $scope.graphInstitution = $scope.graphInstitution.concat($scope.tableData15[i].university[j].faculty);
                            }

                        }

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

                        $scope.graphInstitution = [];
                        for (var i = $scope.tableData16.length - 1; i >= 0; i--) {

                            for (var j = $scope.tableData16[i].university.length - 1; j >= 0; j--) {
                                $scope.graphInstitution = $scope.graphInstitution.concat($scope.tableData16[i].university[j].faculty);
                            }

                        }

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
                        $scope.graphInstitution = [];
                        for (var i = $scope.tableData17.length - 1; i >= 0; i--) {

                            for (var j = $scope.tableData17[i].university.length - 1; j >= 0; j--) {
                                $scope.graphInstitution = $scope.graphInstitution.concat($scope.tableData17[i].university[j].faculty);
                            }

                        }

                        $scope.isLoading = false;
                        $scope.hasData = true;

                    }

                }


            }).
            error(function(data, status, headers, config) {

                $scope.isLoading = false;
                $scope.hasData = false;


            });


            $scope.chart = {
                "institution": ""
            };
            $scope.setChart = function(gpr) {

                if (gpr == '9') {

                    $scope.chart.labels = [];
                    $scope.chart.data = [
                        []
                    ];
                    $scope.chart.series = [$translate.instant("CHART_PERCENT_ENROLLED")];

                    for (var i = 0; i < $scope.chart.institution.years.length; i++) {

                        $scope.chart.labels.push($scope.chart.institution.years[i].academicYear);

                        if ($scope.chart.institution.years[i].studentsApplied == null) {
                            $scope.chart.data[0].push([0]);
                        } else {
                            $scope.chart.data[0].push($scope.chart.institution.years[i].studentsApplied, $scope.chart.institution.years[i].studentsEnrolled);
                        }

                    }

                } else if (gpr == '10') {

                    $scope.chart.labels = [];
                    $scope.chart.data = [];

                    for (var i = 0; i < $scope.chart.cycle.programmes.length; i++) {
                        $scope.chart.labels.push($scope.chart.cycle.programmes[i].programmeName);
                        $scope.chart.data.push($scope.chart.cycle.programmes[i].studentsEnrolled);
                    }

                } else if (gpr == '11') {

                    $scope.chart.labels = [];
                    $scope.chart.data = [];

                    for (var i = 0; i < $scope.chart.cycle.nationality.length; i++) {
                        $scope.chart.labels.push($scope.chart.cycle.nationality[i].nationalityName);
                        $scope.chart.data.push($scope.chart.cycle.nationality[i].studentsEnrolled);
                    }

                } else if (gpr == '12') {

                    $scope.chart.labels = [];
                    $scope.chart.data = [];

                    for (var i = 0; i < $scope.chart.program.nationality.length; i++) {
                        $scope.chart.labels.push($scope.chart.program.nationality[i].nationalityName);
                        $scope.chart.data.push($scope.chart.program.nationality[i].studentsEnrolled);
                    }

                } else if (gpr == '13') {

                    $scope.chart.labels = [$translate.instant("GPR_5_TH_FEMALE"), $translate.instant("GPR_5_TH_MALE")];
                    $scope.chart.data = [];

                    $scope.chart.data = [$scope.chart.cycle.gender[0].studentsEnrolled, $scope.chart.cycle.gender[1].studentsEnrolled];

                } else if (gpr == '14') {

                    $scope.chart.labels = [$translate.instant("GPR_5_TH_FEMALE"), $translate.instant("GPR_5_TH_MALE")];
                    $scope.chart.data = [];

                    $scope.chart.data = [$scope.chart.program.gender[0].studentsEnrolled, $scope.chart.program.gender[1].studentsEnrolled];

                } else if (gpr == '15') {

                    $scope.chart.data = [$scope.chart.cycle.GraduatesNumber, $scope.chart.cycle.MastersOrPhdEnrolled, $scope.chart.cycle.EmployedNumeber,
                        $scope.chart.cycle.UnemployedNumber, $scope.chart.cycle.UnknownStatusNumber
                    ];
                    $scope.chart.series = $scope.chart.labels = [$translate.instant("GPR_7_GRADUATED"), $translate.instant("GPR_7_MASTERS"), $translate.instant("GPR_7_EMPLOYED"),
                        $translate.instant("GPR_7_UNEMPLOYED"), $translate.instant("GPR_7_UNKNOWN")
                    ];

                } else if (gpr == '16') {

                    $scope.chart.data = [$scope.chart.program.GraduatesNumber, $scope.chart.program.MastersOrPhdEnrolled, $scope.chart.program.EmployedNumeber,
                        $scope.chart.program.UnemployedNumber, $scope.chart.program.UnknownStatusNumber
                    ];
                    $scope.chart.series = $scope.chart.labels = [$translate.instant("GPR_7_GRADUATED"), $translate.instant("GPR_7_MASTERS"), $translate.instant("GPR_7_EMPLOYED"),
                        $translate.instant("GPR_7_UNEMPLOYED"), $translate.instant("GPR_7_UNKNOWN")
                    ];

                } else if (gpr == '17') {

                    // console.log($scope.chart.cycle);
                    // $scope.labels = [];
                    // $scope.data = [];

                    // var tmp1 = [];
                    // var tmp2 = [];

                    // $scope.series = ['Државна', 'Приватна'];

                    // for (var i = $scope.chart.cycle.programmes.length - 1; i >= 0; i--) {

                    //     $scope.labels.push($scope.chart.cycle.programmes[i].programmeName);

                    //     tmp1.push(parseInt($scope.chart.cycle.programmes[i].StateQuoteCost));
                    //     tmp2.push(parseInt($scope.chart.cycle.programmes[i].PrivateQuoteCost));

                    // }

                    // $scope.data.push([tmp1, tmp2]);


                    // $scope.labels = ["11", "12", "13", "14", "15", "16", "17"];

                    // $scope.series = ['Државна', 'Приватна'];
                    // $scope.data = [
                    //     [200, 200, 200, 200, 200, 200, 200],
                    //     [400, 400, 400, 400, 400, 400, 400]
                    // ];


                }

            }



            $scope.calcPercent = function(a, b) {
                var res = (a * 100) / (b);
                return Math.floor(res);
            }

            $scope.getGender = function(g) {
                if (g == "male") {
                    return "Машки";
                } else {
                    return "Женски";
                }
            }



        }





    });