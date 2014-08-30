angular.module('app.artist', [
])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/artist/:artistId', {
			templateUrl: '/js/app/artist/index.html',
			controller: 'artistController',
			caseInsensitiveMatch: true
		});
}])

.controller('artistController', ['$scope','$rootScope','$routeParams','commonService', function($scope, $rootScope, $routeParams, commonService){
	$rootScope.title = 'Artist'

	$scope.artistId = $routeParams.artistId;

	commonService.artistInfo($scope.artistId, function(data){
		if(data) {
			$scope.artist = data[0][0];
			$scope.profImage = data[1][0];
			$scope.arts = data[2];
		}
	});



}]);