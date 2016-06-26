'use strict';

describe('Controller: PostsCtrl', function(){
	var scope, PostsCtrl, httpBackend;
	beforeEach(module('clientApp'));


	beforeEach(inject(function($controller, $rootScope, Post, $httpBackend){
		httpBackend = $httpBackend;
		var posts = [{'title' : 'This is just for test'}];
		httpBackend.when('GET', 'http://localhost:3000/posts').respond(posts);

		scope = $rootScope.$new();
		PostsCtrl = $controller('PostsCtrl', {'$scope' : scope, 'Post' : Post});
	}));

	afterEach(function() {
	    httpBackend.verifyNoOutstandingExpectation();
	    httpBackend.verifyNoOutstandingRequest();
	});

	it('should get all the posts', function(){
		httpBackend.flush();

		expect(scope.posts).toBeDefined();
		expect(scope.posts.length).toBe(1);
	});

	it('should get the post title', function(){
		httpBackend.flush();
		
		expect(scope.posts[0].title).toBeDefined();
		expect(scope.posts[0].title).toBe('This is just for test');
	});
});