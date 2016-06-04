'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:postSave
 * @description
 * # postSave
 */
angular.module('clientApp')
  .directive('postSave', function () {
    return {
      templateUrl: '../views/post-save.html',
      restrict: 'EA',
      scope: {
      	title: '=',
      	body: '=',
      	intro: '=',
        heading: '@',
        save: '&'
      },
      link: function (scope, element, attrs) {
      }
    };
  });
