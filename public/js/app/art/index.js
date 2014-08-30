
angular.module('app.art', [
])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/art/:artId', {
			templateUrl: '/js/app/art/index.html',
			controller: 'artController',
			caseInsensitiveMatch: true
		})
}])

.controller('artController', ['$scope','$rootScope', '$routeParams', 'commonService', function($scope,$rootScope,$routeParams,commonService){
	$rootScope.title = 'Art';

	$rootScope.artId = $routeParams.artId;

	commonService.artInfo($scope.artId, function(data){
		if(data){
			$scope.art = data[0];
		}
	});
}]);