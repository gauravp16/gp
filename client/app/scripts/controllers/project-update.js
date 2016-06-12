'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProjectUpdateCtrl
 * @description
 * # ProjectUpdateCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ProjectUpdateCtrl', function ($scope, Project, $route, notify, $window) {
    Project.one($route.current.params.projectId).get().then(function(project){
	    $scope.project = project;
	});	

	$scope.save = function(){
		$scope.project.put().then(function(){
			notify('project updated successfully');
			$window.location = '#/support/manageProjects';
		});
	};
  });
