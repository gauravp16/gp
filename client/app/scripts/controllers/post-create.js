'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SupportCtrl
 * @description
 * # SupportCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('PostCreateCtrl', function ($scope, notify, Post) {
    $scope.title = "";
    $scope.intro = "";
    $scope.body = "";

  	$scope.create = function() {
      Post.post({'intro': $scope.intro, 'title' : $scope.title, 'text' : $scope.body, 'createdBy': 'Gaurav'}).then(function(){
        notify('post created successfully');
      });
    };
  });
