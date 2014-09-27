angular.module('app',[
	'ngRoute',
	'ngSanitize',
	'ngCkeditor',
	'app.session',
	'app.authService',
	'app.services',
	'app.header',
	'app.footer',
	'app.home',
	'app.artist',
	'app.artist.update',
	'app.artist.add',
	'app.art',
	'app.art.add',
	'app.auth',
	'app.category',
	'app.about',
	'app.events',
	'app.contact'
	
])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.otherwise('/');
}])

.controller('baseController', ['$scope','$rootScope','$location','session', function($scope, $rootScope, $location, session){
	session.getUser(function(res){
		if(!res) {
			$location.path('/Auth');
		}
	});
}]);