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

      GPR_TABLE: 'Табела',
      GPR_CHART: 'График',
      GPR_1: '% на запишани ученици по училиште',
      GPR_1_TH_SCHOOL:'Училиште',
      GPR_1_TH_MUNICI:'Општина',
      GPR_1_TH_SCHOOL_YEAR:'Учебна година',
      GPR_1_TH_TYPE:'Тип',
      GPR_1_TH_APPLIED:'Бр. аплицирани',
      GPR_1_TH_ENROLLED:'Бр. запишани',
      GPR_1_TH_PERCENT: '%',
      GPR_1_TH_STUDENTS: 'Ученици',
      GPR_2: '',
      GPR_3: 'Број на запишани ученици по училиште и по националност',
      GPR_3_TH_NATIONALITY: 'Националност',
      GPR_4: '',
      GPR_4_STUDENTS_NATIONALITY:'Ученици по националност',
      GPR_5: 'Број на запишани ученици по училиште и по пол',
      GPR_5_TH_GENDER: 'Пол',
      GPR_5_TH_MALE: 'Машки',
      GPR_5_TH_FEMALE: 'Женски',
      GPR_5_STUDENTS_GENDER: 'Ученици по пол',
      GPR_6: '',
      GPR_7: 'Запишани на факултет/вработени/невработени/не регистрирани по училиште',
      GPR_7_GRADUATED: 'Дипломирани',
      GPR_7_ENROLLED: 'На универзитет',
      GPR_7_EMPLOYED: 'Вработени',
      GPR_7_UNEMPLOYED: 'Невработени',
      GPR_7_UNKNOWN: 'Непознат статус',
      GPR_8: '',
      GPR_9: '% на запишани студенти по факултет',
      GPR_10: '',
      GPR_11: 'Број на запишани студенти по факултет и по националност',
      GPR_12: '',
      GPR_13: 'Број на запишани студенти по факултет и по пол',
      GPR_14: '',
      GPR_15: '',
      GPR_16: '',
      GPR_17: 'Цена на студии',

      // secondary education

      FILTER_INSTITUTION: 'Институции',
      FILTER_QUESTIONS: 'Прашање',
      SELECT_QUESTION: 'Изберете прашање...',
      BTN_SAVE: 'Зачувај',
      INFO_SHOW: 'Прикажи податоци',
      FOR_SCHOOL_YEAR: 'За учебна година',
      STUDENTS_ENROLLED: 'Запишани ученици',
      STUDENTS_PER_PROGRAM: 'Ученици по програм',
      PROGRAM: 'Програма',
      NO_INFO: 'Нема информации за одбраните параметри',
    })


    .translations('en-US', {
      
      LANGUAGE: 'English',
      MENU_TITLE_PARENTSSTUDENTS : 'Parents and Students',
      MENU_TITLE_INVESTORS: 'Investors',
      MENU_TITLE_RESEARCHERS: 'Researchers',
      MENU_SECONDARY: 'Secondary studies',
      MENU_POST_SECONDARY: 'Post Secondary studies',
      MENU_PROGRAMS: 'Programs',

      GPR_TABLE: 'Table',
      GPR_CHART: 'Chart',
      GPR_1: '% of enrolled students per school',
      GPR_1_TH_SCHOOL:'School name',
      GPR_1_TH_MUNICI:'Municipality',
      GPR_1_TH_SCHOOL_YEAR:'School year',
      GPR_1_TH_TYPE:'Type',
      GPR_1_TH_APPLIED:'Students applied',
      GPR_1_TH_ENROLLED:'Students enrolled',
      GPR_1_TH_PERCENT: '%',
      GPR_1_TH_STUDENTS: 'Students',
      GPR_2: '',
      GPR_3: 'Enrolled students per school per Nationality',
      GPR_3_TH_NATIONALITY: 'Nationality',
      GPR_4: '',
      GPR_4_STUDENTS_NATIONALITY:'Students per nationality',
      GPR_5: 'Enrolled students per school per Gender',
      GPR_5_TH_GENDER: 'Gender',
      GPR_5_TH_MALE: 'Male',
      GPR_5_TH_FEMALE: 'Female',
      GPR_5_STUDENTS_GENDER: 'Students per gender',
      GPR_6: '',
      GPR_7: 'University enrolled/employed/unemployed/not registered per school',
      GPR_7_GRADUATED: 'Graduated',
      GPR_7_ENROLLED: 'Enrolled',
      GPR_7_EMPLOYED: 'Employed',
      GPR_7_UNEMPLOYED: 'Unemployed',
      GPR_7_UNKNOWN: 'Unknown status',
      GPR_8: '',
      GPR_9: '% of enrolled students per faculty',
      GPR_10: '',
      GPR_11: 'Enrolled students per faculty per Nationality',
      GPR_12: '',
      GPR_13: 'Enrolled students per faculty per Gender',
      GPR_14: '',
      GPR_15: '',
      GPR_16: '',
      GPR_17: 'Costs of studies',

      //secondary education

      FILTER_INSTITUTION: 'Institutions',
      FILTER_QUESTIONS: 'Question',
      SELECT_QUESTION: 'Choose question...',
      BTN_SAVE: 'Save',
      INFO_SHOW: 'Show data',
      FOR_SCHOOL_YEAR: 'For school year',
      STUDENTS_ENROLLED: 'Students enrolled',
      PROGRAM: 'Program',
      NO_INFO: 'There is no data for the selected parameters',
    })
    .translations('sq-SQ', {
      
      LANGUAGE: 'Shqiptar',
      MENU_TITLE_PARENTSSTUDENTS : 'Prindërit dhe Studentët',
      MENU_TITLE_INVESTORS: 'Investitorët',
      MENU_TITLE_RESEARCHERS: 'Kërkuesit',
      MENU_SECONDARY: 'Studimet e mesme',
      MENU_POST_SECONDARY: 'Posto shkollimit të mesëm',
      MENU_PROGRAMS: 'Programet',

      GPR_TABLE: '',
      GPR_CHART: '',
      GPR_1: '% of enrolled students per school',
      GPR_1_TH_SCHOOL:'',
      GPR_1_TH_MUNICI:'',
      GPR_1_TH_SCHOOL_YEAR:'',
      GPR_1_TH_TYPE:'',
      GPR_1_TH_APPLIED:'',
      GPR_1_TH_ENROLLED:'',
      GPR_1_TH_PERCENT: '%',
      GPR_1_TH_STUDENTS: 'Students',
      GPR_2: '',
      GPR_3: 'Enrolled students per school per Nationality',
      GPR_3_TH_NATIONALITY: '',
      GPR_4: '',
      GPR_4_STUDENTS_NATIONALITY:'Students per nationality',
      GPR_5: 'Enrolled students per school per Gender',
      GPR_5_TH_GENDER: 'Gender',
      GPR_5_TH_MALE: 'Male',
      GPR_5_TH_FEMALE: 'Female',
      GPR_5_STUDENTS_GENDER: 'Students per gender',
      GPR_6: '',
      GPR_7: 'University enrolled/employed/unemployed/not registered per school',
      GPR_7_GRADUATED: 'Graduated',
      GPR_7_ENROLLED: 'Enrolled',
      GPR_7_EMPLOYED: 'Employed',
      GPR_7_UNEMPLOYED: 'Unemployed',
      GPR_7_UNKNOWN: 'Unknown status',
      GPR_8: '',
      GPR_9: '% of enrolled students per faculty',
      GPR_10: '',
      GPR_11: 'Enrolled students per faculty per Nationality',
      GPR_12: '',
      GPR_13: 'Enrolled students per faculty per Gender',
      GPR_14: '',
      GPR_15: '',
      GPR_16: '',
      GPR_17: 'Costs of studies',

      //secondary education

      FILTER_INSTITUTION: 'Institutions',
      FILTER_QUESTIONS: 'Question',
      SELECT_QUESTION: 'Choose a question...',
      BTN_SAVE: 'Save',
      INFO_SHOW: 'Show data',
      FOR_SCHOOL_YEAR: 'For school year',
      STUDENTS_ENROLED: 'Students enrolled',
      PROGRAM: 'Program',
      NO_INFO: 'There is no data for the selected parameters',

    })
    .fallbackLanguage('mk-MK')
    .preferredLanguage('mk-MK');

})

.controller('translateController', ['$scope', '$translate' ,'$rootScope', function ($scope, $translate, $rootScope) {
      
      $rootScope.userLang = 'en-US'

      $translate.use($rootScope.userLang);
  }
]);


