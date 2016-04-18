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
            "url": "/apisecondary/gpr/1",
            "name": "Programs per school"
        }, {
            "url": "/apisecondary/gpr/2",
            "name": "Number of enrolled students per program per school year"
        }], 

        "apiuniversity": [{

        }]

    });