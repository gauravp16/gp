'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SupportCtrl
 * @description
 * # SupportCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SupportCtrl', function ($http, $scope, $routeParams, $auth, appConfig) {

  	$scope.authenticate = function() {
      $auth.authenticate('google').then(function(){
            var token = $auth.getToken();
            $http.post(appConfig.apiRoot + '/support', {headers : {'Authorization' : token}}).then(function(response){
            	$auth.removeToken();
            	$auth.setToken(response.data.token);
            });
        }).
        catch(function (response) {
            console.debug("catch", response);
      });
    };

    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };
  });
