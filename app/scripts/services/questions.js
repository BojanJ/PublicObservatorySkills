'use strict';

/**
 * @ngdoc service
 * @name skillsApp.questions
 * @description
 * # questions
 * Constant in the skillsApp.
 */
angular.module('skillsApp')
    .constant('QUESTIONS_EN', {
        //
        "BASE_URL": "http://sdis-upload.grabit.mk",
        //

        "apisecondary": [{
            "gpr": "1",
            "url": "/apisecondary/gpr/1",
            "name": "% of enrolled students per school"
        }, {
            "gpr": "2",
            "url": "/apisecondary/gpr/2",
            "name": "% of enrolled students per program"
        }, {
            "gpr": "3",
            "url": "/apisecondary/gpr/3",
            "name": "Enrolled students per school per Nationality"
        }, {
            "gpr": "4",
            "url": "/apisecondary/gpr/4",
            "name": "Enrolled students per Program per Nationality"
        }, {
            "gpr": "5",
            "url": "/apisecondary/gpr/5",
            "name": "Enrolled students per school per Gender"
        }, {
            "gpr": "6",
            "url": "/apisecondary/gpr/6",
            "name": "Enrolled students per Program per Gender"
        }, {
            "gpr": "7",
            "url": "/apisecondary/gpr/7",
            "name": "University enrolled/employed/unemployed/not registered per school"
        }, {
            "gpr": "8",
            "url": "/apisecondary/gpr/8",
            "name": "University enrolled/employed/unemployed/not registered per school per Program"
        }], 

        "apiuniversity": [{
            "gpr": "9",
            "url": "/apiuniversity/gpr/9",
            "name": "% of enrolled students per faculty"
        }, {
            "gpr": "10",
            "url": "/apiuniversity/gpr/10",
            "name": "% of enrolled students per Program"
        }, {
            "gpr": "11",
            "url": "/apiuniversity/gpr/11",
            "name": "Enrolled students per faculty per Nationality"
        }, {
            "gpr": "12",
            "url": "/apiuniversity/gpr/12",
            "name": "Enrolled students per Program per Nationality"
        }, {
            "gpr": "13",
            "url": "/apiuniversity/gpr/13",
            "name": "Enrolled students per faculty per Gender"
        }, {
            "gpr": "14",
            "url": "/apiuniversity/gpr/14",
            "name": "Enrolled students per Program per Gender"
        }, {
            "gpr": "15",
            "url": "/apiuniversity/gpr/15",
            "name": "University enrolled/employed/unemployed/not registered per school"
        }, {
            "gpr": "16",
            "url": "/apiuniversity/gpr/16",
            "name": "University enrolled/employed/unemployed/not registered per school per Program"
        }, {
            "gpr": "17",
            "url": "/apiuniversity/gpr/17",
            "name": "Costs of studies"
        }]

    }).constant('QUESTIONS_MK', {
        //
        "BASE_URL": "http://sdis-upload.grabit.mk",
        //

        "apisecondary": [{
            "gpr": "1",
            "url": "/apisecondary/gpr/1",
            "name": "Процент на запишани ученици по училиште"
        }, {
            "gpr": "2",
            "url": "/apisecondary/gpr/2",
            "name": "Процент на запишани ученици по програма"
        }, {
            "gpr": "3",
            "url": "/apisecondary/gpr/3",
            "name": "Број на запишани ученици по училиште по националност"
        }, {
            "gpr": "4",
            "url": "/apisecondary/gpr/4",
            "name": "Број на запишани ученици по програма по националност"
        }, {
            "gpr": "5",
            "url": "/apisecondary/gpr/5",
            "name": "Број на запишани ученици по училиште по пол"
        }, {
            "gpr": "6",
            "url": "/apisecondary/gpr/6",
            "name": "Број на запишани ученици по програма по пол"
        }, {
            "gpr": "7",
            "url": "/apisecondary/gpr/7",
            "name": "Запишани на универзитет/вработени/невработени/нерегистрирани по училиште"
        }, {
            "gpr": "8",
            "url": "/apisecondary/gpr/8",
            "name": "Запишани на универзитет/вработени/невработени/нерегистрирани по училиште по програма"
        }], 


        "apiuniversity": [{
            "gpr": "9",
            "url": "/apiuniversity/gpr/9",
            "name": "% of enrolled students per faculty"
        }, {
            "gpr": "10",
            "url": "/apiuniversity/gpr/10",
            "name": "% of enrolled students per Program"
        }, {
            "gpr": "11",
            "url": "/apiuniversity/gpr/11",
            "name": "Enrolled students per faculty per Nationality"
        }, {
            "gpr": "12",
            "url": "/apiuniversity/gpr/12",
            "name": "Enrolled students per Program per Nationality"
        }, {
            "gpr": "13",
            "url": "/apiuniversity/gpr/13",
            "name": "Enrolled students per faculty per Gender"
        }, {
            "gpr": "14",
            "url": "/apiuniversity/gpr/14",
            "name": "Enrolled students per Program per Gender"
        }, {
            "gpr": "15",
            "url": "/apiuniversity/gpr/15",
            "name": "University enrolled/employed/unemployed/not registered per school"
        }, {
            "gpr": "16",
            "url": "/apiuniversity/gpr/16",
            "name": "University enrolled/employed/unemployed/not registered per school per Program"
        }, {
            "gpr": "17",
            "url": "/apiuniversity/gpr/17",
            "name": "Costs of studies"
        }]

    });
