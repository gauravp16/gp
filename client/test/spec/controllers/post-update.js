'use strict';

describe('Controller: PostUpdateCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var PostUpdateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PostUpdateCtrl = $controller('PostUpdateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PostUpdateCtrl.awesomeThings.length).toBe(3);
  });
});
