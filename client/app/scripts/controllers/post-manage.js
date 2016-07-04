'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:PostUpdateCtrl
 * @description
 * # PostUpdateCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('PostManageCtrl', function ($scope, Post, notify, $route, SweetAlert	) {
    $scope.posts = Post.getList().$object;

    $scope.delete = function(post){
    	SweetAlert.swal({
		   title: "Are you sure?",
		   text: "This will remove the entire post",
		   type: "warning",
		   showCancelButton: true,
		   confirmButtonColor: "#DD6B55",
		   confirmButtonText: "Yes, delete it!",
		   closeOnConfirm: true
		}, 
		function(isConfirm){ 
			if(isConfirm){
			   Post.one(post._id).remove().then(function(){
		    		notify('post removed successfully');
		    		$route.reload();
	    		});
			}
		});
   };
});
