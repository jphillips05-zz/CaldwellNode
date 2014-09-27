angular.module('app.home',[
])
.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/js/app/home/index.html',
			controller: 'homeController',
			caseInsensitiveMatch: true,
			access: { requiredLogin: false }
		});
}])

.controller('homeController', ['$scope','$rootScope', 'commonService', 'session', function($scope, $rootScope, commonService, session){
	$rootScope.title = 'Home';

	$scope.isAuth = false;
	
	commonService.getCategories(function(d){
		$scope.catagories = d;	
	});

	commonService.buildIndex(function(d){
		$scope.artists = d;
	});

}])