/**
* app.about Module
*
* Description
*/
angular.module('app.about', [])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/AboutUs', {
			templateUrl:'/js/app/about/index.html',
			contrroller: 'aboutController',
			caseInsensitiveMatch: true
		});
}])

.controller('about', ['$scope','$rootScope', function($scope, $rootScope){
	$rootScope.title = 'About Us';

}]);