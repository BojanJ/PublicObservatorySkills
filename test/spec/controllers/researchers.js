'use strict';

describe('Controller: ResearchersCtrl', function () {

  // load the controller's module
  beforeEach(module('skillsApp'));

  var ResearchersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResearchersCtrl = $controller('ResearchersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
