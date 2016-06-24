'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:PostDeleteCtrl
 * @description
 * # PostDeleteCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('PostCommentDeleteCtrl', function ($scope, Post, $routeParams, notify, $route, SweetAlert) {
    Post.one($routeParams.postId).get().then(function(post){
    	$scope.post = post;
        post.getList('comments').then(function(comments){
            $scope.postComments = comments;
        });
    });

    $scope.postComments = [];

    $scope.delete = function(comment){
        SweetAlert.swal({
           title: "Are you sure?",
           text: "This will remove the post comment",
           type: "warning",
           showCancelButton: true,
           confirmButtonColor: "#DD6B55",
           confirmButtonText: "Yes, delete it!",
           closeOnConfirm: true
        }, 
        function(){ 
            comment.remove().then(function(){
                notify('comment removed successfully');
                $route.reload();
            });   
        });
    };
  });
