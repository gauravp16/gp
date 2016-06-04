'use strict';

describe('Controller: PostDeleteCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var PostDeleteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PostDeleteCtrl = $controller('PostDeleteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PostDeleteCtrl.awesomeThings.length).toBe(3);
  });
});
