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

	$scope.catagories = commonService.getCategories(function(d){
		//console.log(d);
	});

}])