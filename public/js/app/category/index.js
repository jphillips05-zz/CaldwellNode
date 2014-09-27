
angular.module('app.category', [
])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/category/:categoryId', {
			templateUrl: '/js/app/category/index.html',
			controller: 'categoryController',
			caseInsensitiveMatch: true,
			access: { requiredLogin: false }
		});
}])

.controller('categoryController', ['$scope','$rootScope','$routeParams', 'commonService', function($scope, $rootScope, $routeParams, commonService){
	$rootScope.title = 'Category';
	$scope.categoryId = $routeParams.categoryId

	commonService.getCategoryInfo($scope.categoryId, function(data){
		if(data) {
			$scope.category = data[0][0];
			$scope.arts = data[1];
		}
	});
}]);