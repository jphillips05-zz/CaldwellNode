angular.module('app.artist', [
])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/artist/:artistId', {
			templateUrl: '/js/app/artist/index.html',
			controller: 'artistController',
			caseInsensitiveMatch: true,
			access: { requiredLogin: false }
		});
}])

.controller('artistController', ['$scope','$rootScope','$routeParams','commonService', 'session', function($scope, $rootScope, $routeParams, commonService, session){
	$rootScope.title = 'Artist'

	$scope.artistId = $routeParams.artistId;
	$scope.arts = [];

	commonService.artistInfo($scope.artistId, function(data){
		if(data) {
			$scope.artist = data;
			for(var i=0; i<data.art.length; i++) {
				commonService.getArt(data.art[i], function(artData){
					if(artData){
						$scope.arts.push(artData);
					}
				});
			}
		}

	});

	session.getUser(function(ret){
		if(ret) {
			$scope.isAuth = true;
		} 
	});

}]);