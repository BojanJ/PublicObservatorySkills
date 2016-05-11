'use strict';

/**
 * @ngdoc overview
 * @name skillsApp
 * @description
 * # skillsApp
 *
 * Main module of the application.
 */
angular
    .module('skillsApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'mgcrea.ngStrap',
        'pascalprecht.translate',
        'angularTranslateApp',
        'LocalStorageModule',
        'ui.select',
        'chart.js',
        'ngTable',
        'angularjs-dropdown-multiselect',
    ])
    .config(function (ChartJsProvider) {
  ChartJsProvider.setOptions({ colours : [ '#00ADF9', '#803690', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
})
    .config(function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'vm'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl',
            controllerAs: 'vm'
        })
        .when('/students', {
            templateUrl: 'views/students.html',
            controller: 'StudentsCtrl',
            controllerAs: 'vm'
        })
        .when('/investors', {
            templateUrl: 'views/investors.html',
            controller: 'InvestorsCtrl',
            controllerAs: 'vm'
        })
        .when('/researchers', {
            templateUrl: 'views/researchers.html',
            controller: 'ResearchersCtrl',
            controllerAs: 'vm'
        })
        .when('/students/secondary', {
            templateUrl: 'views/studentsseconday.html',
            controller: 'StudentssecondayCtrl',
            controllerAs: 'vm'
        })
        .when('/students/postsecondary', {
            templateUrl: 'views/studentspostseconday.html',
            controller: 'StudentspostsecondayCtrl',
            controllerAs: 'vm'
        })
        .when('/researchers/secondary', {
            templateUrl: 'views/researcherssecondary.html',
            controller: 'ResearcherssecondaryCtrl',
            controllerAs: 'vm'
        })
        .when('/researchers/postsecondary', {
            templateUrl: 'views/researcherspostsecondary.html',
            controller: 'ResearcherspostsecondaryCtrl',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });
    });

angular.module('angularTranslateApp', ['pascalprecht.translate']);