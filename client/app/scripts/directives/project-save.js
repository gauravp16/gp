'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:postSave
 * @description
 * # postSave
 */
angular.module('clientApp')
  .directive('projectSave', function () {
    return {
      templateUrl: '../views/project-save.html',
      restrict: 'EA',
      scope: {
      	title: '=',
      	body: '=',
        heading: '@',
        save: '&'
      },
      link: function () {
      }
    };
  });
