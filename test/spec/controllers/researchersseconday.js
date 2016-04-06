'use strict';

describe('Controller: ResearcherssecondayCtrl', function () {

  // load the controller's module
  beforeEach(module('skillsApp'));

  var ResearcherssecondayCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResearcherssecondayCtrl = $controller('ResearcherssecondayCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
