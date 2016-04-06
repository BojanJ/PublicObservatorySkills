  'use strict';

/**
 * @ngdoc controller
 * @name observatorySkillsApp.controller:TranslateCtrl
 * @description
 * # TranslateCtrl
 * Controller of the observatorySkillsApp
 */
angular.module('angularTranslateApp', ['pascalprecht.translate'])
  .config(function($translateProvider) {
    $translateProvider.translations('mk-MK', {

      LANGUAGE: 'Македонски',
      MENU_TITLE_PARENTSSTUDENTS : 'Родители и Студенти',
      MENU_TITLE_INVESTORS: 'Инвеститори',
      MENU_TITLE_RESEARCHERS: 'Истражувачи',
      MENU_SECONDARY: 'Средно образование',
      MENU_POST_SECONDARY: 'Високо образование',
      MENU_PROGRAMS: 'Програми',

    })


    .translations('en-US', {
      
      LANGUAGE: 'English',
      MENU_TITLE_PARENTSSTUDENTS : 'Parents and Students',
      MENU_TITLE_INVESTORS: 'Investors',
      MENU_TITLE_RESEARCHERS: 'Researchers',
      MENU_SECONDARY: 'Secondary studies',
      MENU_POST_SECONDARY: 'Post Secondary studies',
      MENU_PROGRAMS: 'Programs',
      
    })
    .translations('sq-SQ', {
      
      LANGUAGE: 'Shqiptar',
      MENU_TITLE_PARENTSSTUDENTS : 'Prindërit dhe Studentët',
      MENU_TITLE_INVESTORS: 'Investitorët',
      MENU_TITLE_RESEARCHERS: 'Kërkuesit',
      MENU_SECONDARY: 'Studimet e mesme',
      MENU_POST_SECONDARY: 'Posto shkollimit të mesëm',
      MENU_PROGRAMS: 'Programet',

    })
    .fallbackLanguage('mk-MK')
    .preferredLanguage('mk-MK');

})

.controller('translateController', ['$scope', '$translate' ,'$rootScope', function ($scope, $translate, $rootScope) {
      
      $rootScope.userLang = 'en-US'

      $translate.use($rootScope.userLang);
  }
]);


