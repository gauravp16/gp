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
    'ngCookies',
    'ngRoute',
    'restangular',
    'satellizer',
    'angularMoment',
    'angular-timeline',
    'cgNotify',
    'oitozero.ngSweetAlert'
  ])
  .config(function ($routeProvider, RestangularProvider, $authProvider,$httpProvider) {
    RestangularProvider.setBaseUrl('http://localhost:3000');
    RestangularProvider.setRestangularFields({
      id: "_id"
    });
    $routeProvider
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
      .when('/support/postUpdate', {
        templateUrl: 'views/post-update.html',
        controller: 'PostUpdateCtrl'
        //controllerAs: 'postView'
      })
      .when('/support/managePosts', {
        templateUrl: 'views/post-manage.html',
        controller: 'PostManageCtrl'
        //controllerAs: 'postView'
      })
      .when('/support/projectCreate', {
        templateUrl: 'views/project-create.html',
        controller: 'ProjectCreateCtrl'
        //controllerAs: 'postView'
      })
      .when('/support/projectUpdate', {
        templateUrl: 'views/project-update.html',
        controller: 'ProjectUpdateCtrl'
        //controllerAs: 'postView'
      })
      .when('/support/manageProjects', {
        templateUrl: 'views/project-manage.html',
        controller: 'ProjectManageCtrl'
      })
      .when('/support/postCommentDelete', {
        templateUrl: 'views/post-comment-delete.html',
        controller: 'PostCommentDeleteCtrl'
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
  })
  .run(function($rootScope, $location) {
      $rootScope.$on("$locationChangeStart", function() { 
        if($location.path() == "/" || $location.path() == "/about"){
          $rootScope.showHeader = true;
        }
        else{
          $rootScope.showHeader = false;
        }
    });
  });
  
