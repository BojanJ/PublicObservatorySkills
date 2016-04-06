'use strict';

describe('Controller: StudentspostsecondayCtrl', function () {

  // load the controller's module
  beforeEach(module('skillsApp'));

  var StudentspostsecondayCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentspostsecondayCtrl = $controller('StudentspostsecondayCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
