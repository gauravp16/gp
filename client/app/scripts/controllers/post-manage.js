'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:PostUpdateCtrl
 * @description
 * # PostUpdateCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('PostManageCtrl', function ($scope, Post, notify, $route) {
    $scope.posts = Post.getList().$object;

    $scope.delete = function(post){
    	Post.one(post._id).remove().then(function(){
    		notify('post removed successfully');
    		$route.reload();
    	});
    };
  });
