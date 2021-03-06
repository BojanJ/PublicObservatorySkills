'use strict';

describe('Controller: InvestorsCtrl', function () {

  // load the controller's module
  beforeEach(module('skillsApp'));

  var InvestorsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InvestorsCtrl = $controller('InvestorsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
