'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('PostsCtrl', function ($scope, Post) {
  	$scope.posts = Post.getList().$object;
  });
