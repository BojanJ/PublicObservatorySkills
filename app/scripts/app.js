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
  ])
  .config(function ($routeProvider) {
    $routeProvider
      // .when('/', {
      //   templateUrl: 'views/main.html',
      //   controller: 'MainCtrl'
      // })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/students', {
        templateUrl: 'views/students.html',
        controller: 'StudentsCtrl'
      })
      .when('/investors', {
        templateUrl: 'views/investors.html',
        controller: 'InvestorsCtrl'
      })
      .when('/researchers', {
        templateUrl: 'views/researchers.html',
        controller: 'ResearchersCtrl'
      })
      .when('/students/secondary', {
        templateUrl: 'views/studentsseconday.html',
        controller: 'StudentssecondayCtrl'
      })
      .when('/students/postsecondary', {
        templateUrl: 'views/studentspostseconday.html',
        controller: 'StudentspostsecondayCtrl'
      })
      .when('/researchers/secondary', {
        templateUrl: 'views/researcherssecondary.html',
        controller: 'ResearcherssecondaryCtrl'
      })
      .when('/researchers/postsecondary', {
        templateUrl: 'views/researcherspostsecondary.html',
        controller: 'ResearcherspostsecondaryCtrl'
      })
      .otherwise({
        redirectTo: '/students'
      });
  });

angular.module('angularTranslateApp', ['pascalprecht.translate']);