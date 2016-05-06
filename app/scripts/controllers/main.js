'use strict';

/**
 * @ngdoc function
 * @name skillsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the skillsApp
 */
angular.module('skillsApp').controller('MainCtrl', function($scope, $http, ngTableParams, utility, $translate) {
    var vm = this;
    vm.reportData = {
        q1: null,
        q3: null,
        q5: null,
        q7: null,
        q9: null,
        q11: null,
        q13: null
    };
    vm.questions = {
        q1: {
            tab: 1,
            labels: [],
            series: [],
            data:[]
        },
        q3: {
            tab: 1,
            selectedSchool: null,
            schools: [],
            labels: [],
            series: [],
            data:[]
        },
        q5: {
            tab: 1,
            labels: [],
            series: [$translate.instant("GPR_5_TH_MALE"), $translate.instant("GPR_5_TH_FEMALE")],
            data:[[],[]]
        },
        q7: {
            tab: 1,
            selectedSchool: null,
            schools: [],
            labels: [],
            series: [$translate.instant("GPR_7_TH_GRAD"), 
            $translate.instant("GPR_7_TH_UNIENROLLED"),
             $translate.instant("GPR_7_TH_EMPLOYED"),
             $translate.instant("GPR_7_TH_UNEMPLOYED"), 
             $translate.instant("GPR_7_TH_UNKNOWN")],
            data:[[],[],[],[],[]]
        },
        q9: {
            tab: 1,
            selectedUni: null,
            universities: [],
            labels: [],
            series: [$translate.instant("GPR_1_TH_APPLIED"), $translate.instant("GPR_1_TH_ENROLLED")],
            data:[[],[]]
        },
        q11: {
            tab: 1,
            selectedUni: null,
            universities: [],
            labels: [],
            series: [],
            data:[]
        },
        q13: {
            tab: 1,
            selectedUni: null,
            labels: [],
            series: [],
            data:[]
        },
        activeTab: 0,
        activeQuestion: 0
    };

    $scope.$watch(
        "vm.questions.activeQuestion",
        function handleQuestionChenge(newValue, oldValue) {
            switch (newValue) {
                case 1:
                    if (vm.reportData.q1 == null) {
                        vm.getQuestion1();
                    } else vm.activeQuestion = 0;
                    break;
                case 3:
                    if (vm.reportData.q3 == null) {
                        vm.getQuestion3();
                    } else vm.activeQuestion = 1;
                    break;
                case 5:
                    if (vm.reportData.q5 == null) {
                        vm.getQuestion5();
                    } else vm.activeQuestion = 2;
                    break;
                case 7:
                    if (vm.reportData.q7 == null) {
                        vm.getQuestion7();
                    } else vm.activeQuestion = 3;
                    break;
                case 9:
                    if (vm.reportData.q9 == null) {
                        vm.getQuestion9();
                    } else vm.activeQuestion = 4;
                    break;
                case 11:
                    if (vm.reportData.q11 == null) {
                        vm.getQuestion11();
                    } else vm.activeQuestion = 5;
                    break;
                case 13:
                    if (vm.reportData.q13 == null) {
                        vm.getQuestion13();
                    } else vm.activeQuestion = 6;
                    break;
                default:
                    break;
            }
        }
    );

    vm.getQuestion1 = function() {
        $http.get('http://sdis-upload.grabit.mk/apisecondary/enrolled_students_per_school').
        success(function(data, status, headers, config) {
            vm.reportData.q1 = data = data.response;
            vm.gpr1Table = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: data.length,
                getData: function($defer, params) {
                    var filter = params.filter();
                    var sorting = params.sorting();
                    var count = params.count();
                    var page = params.page();
                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
            vm.setActiveQuestion = 0;
            vm.setQuestion1Chart();
        }).
        error(function(data, status, headers, config) {

        });
    };

    vm.setQuestion1Chart = function() {
        var schoolYears = utility.getDistinctSchooldYearQ1(vm.reportData.q1);
        vm.questions.q1.series = schoolYears;
        for(var i in schoolYears) {
            vm.questions.q1.data.push([]);
        }
        for(var i in vm.reportData.q1) {
            var school = vm.reportData.q1[i];
            var perSchoolData = [];
            for(var j in vm.reportData.q1) {
                var schoolIttr = vm.reportData.q1[j];
                if(school.schoolId == schoolIttr.schoolId) {
                    perSchoolData.push(schoolIttr);
                }
            }

            vm.questions.q1.labels.push(school.schoolName.substr(0, 15) + "...");
            for(var s in perSchoolData) {
                var index = 0;
                for(var i in schoolYears){
                    if(schoolYears[i] == perSchoolData[s].schoolYear)
                    {
                        index = parseInt(i);
                        break;
                    }
                }
                var percent = perSchoolData[s].studentsApplied == null ? 100 : ((perSchoolData[s].studentsEnrolled * 100) / perSchoolData[s].studentsApplied);
                vm.questions.q1.data[index].push(percent)
            }
        }
    };

    vm.getQuestion3 = function() {
        $http.get('http://sdis-upload.grabit.mk/apisecondary/enrolled_students_per_nationality').
        success(function(data, status, headers, config) {
            data = data.response;
            
            //vm.reportData.q3.distinctNat = utility.getDistinctNationalityQ3(data);
            for(var i in data) {
                var school = data[i];
                for(var j in school.nationalities) {
                    var nationality = school.nationalities[j];
                    var enrolledPerNationality = 0;
                    for(var p in nationality.programmes) {
                        enrolledPerNationality += nationality.programmes[p].studentsEnrolled;
                    }
                    nationality.enrolledPerNationality = enrolledPerNationality;
                }
            }

            vm.reportData.q3 = data;

            vm.gpr3Table = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: data.length,
                getData: function($defer, params) {
                    var filter = params.filter();
                    var sorting = params.sorting();
                    var count = params.count();
                    var page = params.page();
                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
            vm.setActiveQuestion = 1;
            vm.questions.q3.schools = utility.getDistinctSchoolsQ3(vm.reportData.q3);
        }).
        error(function(data, status, headers, config) {

        });
    };

    vm.setQuestion3Chart = function() {
        console.log(vm.questions.q3.selectedSchool);
        var school = vm.getSchoolById(vm.questions.q3.selectedSchool.id, vm.reportData.q3);
        var labels = [];
        var data = [];
        for(var n in school.nationalities) {
            labels.push(school.nationalities[n].nationality);
            data.push(school.nationalities[n].enrolledPerNationality);
        }
        vm.questions.q3.labels = labels;
        vm.questions.q3.data = data;
    };

    vm.getSchoolById = function(id, array) {
        var school = null;
        for(var i in array) {
            if(array[i].schoolId == id) {
                if(school == null) {
                    school = array[i];
                }
                else if(school.schoolYear < array[i].schoolYear) {
                    school = array[i];
                }
            }
        }
        return school;
    };

    vm.getQuestion5 = function() {
        $http.get('http://sdis-upload.grabit.mk/apisecondary/enrolled_students_per_gender').
        success(function(data, status, headers, config) {
            data = data.response;
            for (var i = 0; i < data.length; i++) {
                var school = data[i];
                var maleEnroled = 0;
                var femaleEnroled = 0;
                if (school.male != undefined) {
                    for (var m = 0; m < school.male.length; m++) {
                        var programme = school.male[m];
                        maleEnroled += (programme.studentsEnrolled != null ? programme.studentsEnrolled : 0);
                    }
                }
                if (school.female != undefined) {
                    for (var f = 0; f < school.female.length; f++) {
                        var programme = school.female[f];
                        femaleEnroled += programme.studentsEnrolled != null ? programme.studentsEnrolled : 0;
                    }
                }
                school.femaleEnroled = femaleEnroled;
                school.maleEnroled = maleEnroled;
            }
            vm.reportData.q5 = data;
            vm.gpr5Table = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: data.length,
                getData: function($defer, params) {
                    var filter = params.filter();
                    var sorting = params.sorting();
                    var count = params.count();
                    var page = params.page();
                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
            vm.setActiveQuestion = 2;
            vm.setQuestion5Chart();
        }).
        error(function(data, status, headers, config) {

        });
    };

    vm.setQuestion5Chart = function() {
        for(var i in vm.reportData.q5) {
            var school = vm.reportData.q5[i];
            vm.questions.q5.data[0].push(school.maleEnroled);
            vm.questions.q5.data[1].push(school.femaleEnroled);
            vm.questions.q5.labels.push(school.schoolName.substr(0, 15) + "...");
        }
    };

    vm.getQuestion7 = function() {
        $http.get('http://sdis-upload.grabit.mk/apisecondary/gpr/7').
        success(function(data, status, headers, config) {
            vm.reportData.q7 = data = data.response;
            vm.gpr7Table = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: data.length,
                getData: function($defer, params) {
                    var filter = params.filter();
                    var sorting = params.sorting();
                    var count = params.count();
                    var page = params.page();
                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
            vm.setActiveQuestion = 3;
        }).
        error(function(data, status, headers, config) {

        });
    };

    vm.setQuestion7Chart = function() {
        console.log(vm.questions.q7.selectedSchool);
        vm.questions.q7.labels = [""];
        vm.questions.q7.data[0] = [0];
        vm.questions.q7.data[1] = [0];
        vm.questions.q7.data[2] = [0];
        vm.questions.q7.data[3] = [0];
        vm.questions.q7.data[4] = [0];
        for(var i in vm.questions.q7.selectedSchool.years) {
            var year = vm.questions.q7.selectedSchool.years[i];
            vm.questions.q7.labels.push(year.schoolYear);
            vm.questions.q7.data[0].push(year.GraduatesNumber);
            vm.questions.q7.data[1].push(year.studentsEnrolled);
            vm.questions.q7.data[2].push(year.EmployedNumber);
            vm.questions.q7.data[3].push(year.UnemployedNumber);
            vm.questions.q7.data[4].push(year.UnknownStatusNumber);
        }
        vm.questions.q7.labels.push("");
        vm.questions.q7.data[0].push(0);
        vm.questions.q7.data[1].push(0);
        vm.questions.q7.data[2].push(0);
        vm.questions.q7.data[3].push(0);
        vm.questions.q7.data[4].push(0);
    };

    vm.getQuestion9 = function() {
        $http.get('http://sdis-upload.grabit.mk/apiuniversity/gpr/9').
        success(function(data, status, headers, config) {
            vm.reportData.q9 = data = data.response[0].university;
            var result = [];

            vm.gpr9Table = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: vm.reportData.q9.length,
                getData: function($defer, params) {
                    var filter = params.filter();
                    var sorting = params.sorting();
                    var count = params.count();
                    var page = params.page();
                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });

            vm.questions.q9.universities = utility.getDistinctUniversities9(data);
            vm.setActiveQuestion = 4;
        }).
        error(function(data, status, headers, config) {

        });
    };

    vm.setQuestion9Chart = function() {
        console.log(vm.questions.q9.selectedUni);
        vm.questions.q9.labels = [];
        vm.questions.q9.data[0] = [];
        vm.questions.q9.data[1] = [];
        for(var i in vm.questions.q9.selectedUni.years) {
            var year = vm.questions.q9.selectedUni.years[i];
            vm.questions.q9.labels.push(year.academicYear);
            vm.questions.q9.data[0].push(year.studentsApplied);
            vm.questions.q9.data[1].push(year.studentsEnrolled);
        }
    };

    vm.getQuestion11 = function() {
       $http.get('http://sdis-upload.grabit.mk/apiuniversity/gpr/11').
       success(function(data, status, headers, config) {
            vm.reportData.q11 = data = data.response[0].university;
            var totalRowSpan = 1;

            for(var i in vm.reportData.q11) {
                var uniRowSpan = 1;
                var uni = vm.reportData.q11[i];
                for(var j in uni.faculty) {
                    var fax = uni.faculty[j];
                    var faxRowSpan = 1;
                    for(var k in fax.years) {
                        var year = fax.years[k];
                        var yearRowSpan = 1;
                        for(var m in year.cycles) {
                            var cycle = year.cycles[m];
                            yearRowSpan += cycle.nationality.length +1;
                        }
                        year.rowSpan = yearRowSpan;
                        faxRowSpan += yearRowSpan + 1;
                    }
                    fax.rowSpan = faxRowSpan;
                    uniRowSpan += faxRowSpan;
                }
                uni.rowSpan = uniRowSpan;
            }

            vm.gpr11Table = new ngTableParams({
                page: 1,
                count: 1
            }, {
                total: data.length,
                getData: function($defer, params) {
                    var filter = params.filter();
                    var sorting = params.sorting();
                    var count = params.count();
                    var page = params.page();
                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
            vm.setActiveQuestion = 5; 
            vm.questions.q11.universities = utility.getDistinctUniversities9(data);
        }).
        error(function(data, status, headers, config) {

        });
    };


    vm.setQuestion11Chart = function() {
        console.log(vm.questions.q11.selectedUni);
    };

    vm.getQuestion11();
});