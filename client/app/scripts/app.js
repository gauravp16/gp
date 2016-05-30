'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
    'satellizer',
    'angularMoment',
    'angular-timeline',
    'cgNotify'
  ])
  .config(function ($routeProvider, RestangularProvider, $authProvider,$httpProvider) {
    RestangularProvider.setBaseUrl('http://localhost:3000');
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/posts', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
        //controllerAs: 'posts'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
        //controllerAs: 'projects'
      })
      .when('/post/:id', {
        templateUrl: 'views/post-view.html',
        controller: 'PostViewCtrl'
        //controllerAs: 'postView'
      })
      .when('/support', {
        templateUrl: 'views/support.html',
        controller: 'SupportCtrl'
        //controllerAs: 'postView'
      })
      .when('/support/postCreate', {
        templateUrl: 'views/post-create.html',
        controller: 'PostCreateCtrl'
        //controllerAs: 'postView'
      })
      .when('/support/managePosts', {
        templateUrl: 'views/post-manage.html',
        controller: 'PostManageCtrl'
        //controllerAs: 'postView'
      })
      .otherwise({
        redirectTo: '/'
      });

      $authProvider.google({
        clientId: '361072761241-csh7jno7skqdhrv4pai0hs9o1necgfqt'
      });
      $authProvider.facebook({
        clientId: '171406263256259'
      }); 
      $authProvider.baseUrl = 'http://localhost:3000';
      $httpProvider.baseUrl = 'http://localhost:3000';

  })
  .factory('Project', function(Restangular){
    return Restangular.service('projects');
  }).
  factory('Post', function(Restangular){
    return Restangular.service('posts');
  }).
  factory('Comment', function(Restangular){
    return Restangular.service('posts/:id/comments');
  });