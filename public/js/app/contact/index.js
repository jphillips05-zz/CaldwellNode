/**
*  Module
*
* Description
*/
angular.module('app.contact', [])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/ContactUs', {
			templateUrl: '/js/app/contact/index.html',
			controller: 'contactController',
			caseInsensitiveMatch: true,
			access: { requiredLogin: false }
		})
}])

.controller('contactController', ['$scope','$rootScope','commonService', function($scope, $rootScope, commonService){
	$rootScope.title = 'Contact Us';


	$scope.sendEmail = function(email) {
		console.log(email);
	};

}]);