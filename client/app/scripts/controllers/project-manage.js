'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProjectManageCtrl
 * @description
 * # ProjectManageCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ProjectManageCtrl', function ($scope, Project, notify, $route,SweetAlert) {
    $scope.projects = Project.getList().$object;

    $scope.delete = function(project){
    	SweetAlert.swal({
		   title: "Are you sure?",
		   text: "This will remove the entire project",
		   type: "warning",
		   showCancelButton: true,
		   confirmButtonColor: "#DD6B55",
		   confirmButtonText: "Yes, delete it!",
		   closeOnConfirm: true
		}, 
		function(isConfirm){ 
			if(isConfirm){
				Project.one(project._id).remove().then(function(){
					notify('project removed successfully');
		    		$route.reload();
    			});
			}
		});
    };
  });
