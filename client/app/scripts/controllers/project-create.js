'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProjectCreateCtrl
 * @description
 * # ProjectCreateCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ProjectCreateCtrl', function ($scope, Project, notify, $window) {
    $scope.title = "";
    $scope.body = "";
    $scope.url = "";
    
    $scope.save = function(){
      Project.post({'title' : $scope.title, 'text' : $scope.body, 'url' : $scope.url, 'createdBy': 'Gaurav'}).then(function(){
        notify('project created successfully');
        $window.location = '#/support/manageProjects';
      });
    };
  });
