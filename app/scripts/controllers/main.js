'use strict';

/**
 * @ngdoc function
 * @name skillsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the skillsApp
 */
angular.module('skillsApp').controller('MainCtrl', function($scope, $http, ngTableParams) {
    var vm = this;
    vm.reportData = {
        q1: null,
        q3: null,
        q5: null
    };
    vm.questions = {
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
        }).
        error(function(data, status, headers, config) {

        });
    };

    vm.getQuestion3 = function() {
        $http.get('http://sdis-upload.grabit.mk/apisecondary/enrolled_students_per_nationality').
        success(function(data, status, headers, config) {
            data = data.response;
            for (var i = 0; i < data.length; i++) {
                var school = data[i];
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
        }).
        error(function(data, status, headers, config) {

        });
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
            vm.reportData.q3 = data;
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
        }).
        error(function(data, status, headers, config) {

        });
    };

    vm.getQuestion1();
});