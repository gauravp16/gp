'use strict';

describe('Controller: ProjectsCtrl', function(){
	var scope, ProjectsCtrl, httpBackend;
	beforeEach(module('clientApp'));

	beforeEach(inject(function($controller, $rootScope, Project, $httpBackend){
		httpBackend = $httpBackend;
		var projects = [{'title' : 'Simple JS State Machine'}];
		httpBackend.when('GET', 'http://localhost:3000/projects').respond(projects);

		scope = $rootScope.$new();
		ProjectsCtrl = $controller('ProjectsCtrl', {'$scope' : scope, 'Project' : Project});
	}));

	it('should get all the projects', function(){
		httpBackend.flush();

		expect(scope.projects).toBeDefined();
		expect(scope.projects.length).toBe(1);
		expect(scope.projects[0].title).toBe('Simple JS State Machine');
	});

});