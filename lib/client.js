
angular.module('app', [])
	.controller('MainCtrl', ['$scope', '$http',
	                     function($scope,   $http){
		
		$http.get('/apps').success(function(apps){
			$scope.apps = apps;
		});
		
		$scope.runApp = function(app){
			if(app.running){
				
			}else{
				alert("App is not running");
			}
		};
		
	}]);