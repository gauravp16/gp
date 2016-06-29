'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:PostUpdateCtrl
 * @description
 * # PostUpdateCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('PostUpdateCtrl', function ($scope,Post, notify, $window, $route) {
  	Post.one($route.current.params.postId).get().then(function(post){
	    $scope.post = post;
	});	

	$scope.save = function(){
		$scope.post.put().then(function(){
			notify('post updated successfully');
			$window.location = '#/support/managePosts';
		});
	};
  });
