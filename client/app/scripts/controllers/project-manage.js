'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProjectManageCtrl
 * @description
 * # ProjectManageCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ProjectManageCtrl', function ($scope, Project, notify, $route) {
    $scope.projects = Project.getList().$object;

    $scope.delete = function(project){
    	Project.one(project._id).remove().then(function(){
    		notify('project removed successfully');
    		$route.reload();
    	});
    };
  });
