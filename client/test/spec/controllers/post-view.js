'use strict';

describe('Controller: PostViewCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var PostViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PostViewCtrl = $controller('PostViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PostViewCtrl.awesomeThings.length).toBe(3);
  });
});
