'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AboutCtrl', function () {
    this.posts = [
      {title: 'This is my first post'},
      {title:'I love my family'}
    ];
  });
