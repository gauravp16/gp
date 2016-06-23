'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:PostViewCtrl
 * @description
 * # PostViewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('PostViewCtrl', function ($http, $scope, $routeParams, $auth, $route, Post, Comment) {
    Post.one($routeParams.id).get().then(function(post){
        $scope.post = post;
        post.getList('comments').then(function(comments){
            $scope.postComments = comments;
        });
    });
    $scope.postComments = [];
    $scope.response = '';

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider).then(function()
        {
            var token = $auth.getToken();
            $auth.setToken(token);
        }).
        catch(function (response) {
            console.error("catch", response);
      });
    };

    $scope.submitResponse = function(){
        var payload = $auth.getPayload();
        Comment.post({'body': $scope.response, 'postId': $routeParams.id, 'createdBy' : payload.sub.name, 'createdByPic' : payload.sub.pic}, {}, {'Authorization': 'asdlaskskdsdkl'})
        .then(function(){
            $route.reload();
        });

    };
  });
