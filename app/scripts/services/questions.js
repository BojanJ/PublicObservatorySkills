'use strict';

/**
 * @ngdoc service
 * @name skillsApp.questions
 * @description
 * # questions
 * Constant in the skillsApp.
 */
angular.module('skillsApp')
    .constant('QUESTIONS_MK', {
        //
        "BASE_URL": "http://sdis-upload.grabit.mk",
        //

        "apisecondary": [{
            "gpr": "1",
            "url": "/apisecondary/gpr/1",
            "name": "Programs per school"
        }, {
            "gpr": "2",
            "url": "/apisecondary/gpr/2",
            "name": "Number of enrolled students per program per school year"
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