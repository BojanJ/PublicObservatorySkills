'use strict';

describe('Controller: StudentssecondayCtrl', function () {

  // load the controller's module
  beforeEach(module('skillsApp'));

  var StudentssecondayCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentssecondayCtrl = $controller('StudentssecondayCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
