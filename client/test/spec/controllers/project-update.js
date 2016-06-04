'use strict';

describe('Controller: ProjectUpdateCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ProjectUpdateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectUpdateCtrl = $controller('ProjectUpdateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProjectUpdateCtrl.awesomeThings.length).toBe(3);
  });
});
