'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope) {
    $scope.events = [
    	{
	    badgeClass: 'info',
	    badgeIconClass: 'glyphicon-check',
	    title: 'SPA application with CQRS/EventSourcing',
	    content: 'Front end in AngularJS, web api with Nancy open source framework, services communicating through messages/events over NserviceBus, Specflow as BDD tool'
	  	}, 
	  	{
	    badgeClass: 'info',
	    badgeIconClass: 'glyphicon-credit-card',
	    title: 'WPF/WCF/BDD',
	    content: 'Front end in WPF, domain in WCF, Specflow as BDD tool'
  		},
  		{
	    badgeClass: 'info',
	    badgeIconClass: 'glyphicon-credit-card',
	    title: 'State Machine built in Javascript',
	    content: 'A simple state machine built in javascript distributable as node package, jasmine as test framework. This was my first open source project.'
  		},
  		{
	    badgeClass: 'info',
	    badgeIconClass: 'glyphicon-credit-card',
	    title: 'File listener built in Javascript',
	    content: 'Watches for a file in a directory and allows for tasks like mail, route to a different folder or any custom task. This was another open source project.'
  		},
  		{
	    badgeClass: 'info',
	    badgeIconClass: 'glyphicon-credit-card',
	    title: 'Rails app',
	    content: 'A typical Rails app (Activerecord objects) with MySQL as datastore, cucumber as BDD tool'
  		},
  		{
	    badgeClass: 'info',
	    badgeIconClass: 'glyphicon-credit-card',
	    title: 'Microservices architecture',
	    content: 'Microservices interacting in a RESTful protocol each with its own data store in MySQL, cucumber as BDD tool'
  		},
  		{
	    badgeClass: 'info',
	    badgeIconClass: 'glyphicon-credit-card',
	    title: 'Documentum File Share Services',
	    content: 'FSS, a desktop client application from EMC customised to suit our requirements.'
  		},
  		{
	    badgeClass: 'info',
	    badgeIconClass: 'glyphicon-credit-card',
	    title: 'ASP.NET Webforms',
	    content: 'My first project, an ASP.NET Webforms application built with a 3 tier architecture with sql server as the data store'
  		}

  	];

  	$scope.side = "";
  });
