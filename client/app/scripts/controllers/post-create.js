'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SupportCtrl
 * @description
 * # SupportCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('PostCreateCtrl', function ($scope, Post, notify, $window) {
    $scope.title = "";
    $scope.intro = "";
    $scope.body = "";

    $scope.save = function(){
      Post.post({'intro': $scope.intro, 'title' : $scope.title, 'text' : $scope.body, 'createdBy': 'Gaurav'}).then(function(){
        notify('post created successfully');
        $window.location = '#/support/managePosts';
      });
    };
  });
