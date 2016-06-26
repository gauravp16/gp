'use strict';

describe('Controller: PostViewCtrl', function(){
	var PostViewCtrl, scope, httpBackend, route;

	beforeEach(module('clientApp'));

	beforeEach(inject(function($controller, $rootScope, $httpBackend, $routeParams, $route, Post, Comment, $auth){
		httpBackend = $httpBackend;
		route = $route;

		var post = {'title' : 'This is just for test', '_id' : '12345'};
		httpBackend.when('GET', 'http://localhost:3000/posts/12345').respond(post);

		var comments = [{'body' : 'Like it'}, {'body' : 'Do not like it'}];
		httpBackend.when('GET', 'http://localhost:3000/posts/12345/comments').respond(comments);

		httpBackend.when('POST', 'http://localhost:3000/posts/:id/comments').respond({});

		scope = $rootScope.$new();
		$routeParams.id = '12345';
		spyOn($auth, 'getPayload').and.returnValue({'sub' : {'name' : 'Gaurav', 'pic' : '37672jwhd3dh3uh'}});
		spyOn(route, 'reload').and.returnValue({});

		PostViewCtrl = $controller('PostViewCtrl', {'$scope' : scope, '$routeParams' : $routeParams, '$auth' : $auth, '$route' : route, 'Post' : Post, 'Comment' : Comment});
	}));

	afterEach(function() {
	    httpBackend.verifyNoOutstandingExpectation();
	    httpBackend.verifyNoOutstandingRequest();
	});

	it('should fetch the post' , function(){
		httpBackend.flush();

		expect(scope.post).toBeDefined();
		expect(scope.post.title).toBe('This is just for test');
		expect(scope.post._id).toBe('12345')
	});

	it('should fetch the post comments as well' , function(){
		httpBackend.flush();

		expect(scope.postComments).toBeDefined();
		expect(scope.postComments.length).toBe(2);
		expect(scope.postComments[0].body).toBe('Like it');
		expect(scope.postComments[1].body).toBe('Do not like it');
	});

	it('should submit the response with all the comment details', function(){
		httpBackend.flush();

		scope.response = 'I like this post';
		scope.submitResponse();
		
		httpBackend.flush();
		expect(route.reload).toHaveBeenCalled();
	});

});