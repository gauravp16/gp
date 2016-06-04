'use strict';

describe('Controller: ProjectManageCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ProjectManageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectManageCtrl = $controller('ProjectManageCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProjectManageCtrl.awesomeThings.length).toBe(3);
  });
});
