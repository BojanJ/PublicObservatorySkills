'use strict';

describe('Controller: ResearcherspostsecondaryCtrl', function () {

  // load the controller's module
  beforeEach(module('skillsApp'));

  var ResearcherspostsecondaryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResearcherspostsecondaryCtrl = $controller('ResearcherspostsecondaryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
