angular.module('app.home',[
])
.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/js/app/home/index.html',
			controller: 'homeController',
			caseInsensitiveMatch: true
		});
}])

.controller('homeController', ['$scope','$rootScope', 'commonService', function($scope, $rootScope, commonService){
	$rootScope.title = 'Home';

	commonService.getCategories(function(d){
		$scope.catagories = d;	
	});

	commonService.buildIndex(function(d){
		$scope.artists = d;
	});

}])