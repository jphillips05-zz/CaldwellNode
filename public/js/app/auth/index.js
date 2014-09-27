angular.module('app.auth', [])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/Auth', {
			templateUrl: '/js/app/auth/index.html',
			controller: 'authController',
			caseInsensitiveMatch: true,
			access: { requiredLogin: false }
		});
}])

.controller('authController', ['$scope','$rootScope', '$location', 'authService', 'session', function($scope, $rootScope, $location, authService, session){
	$scope.msg = '';
	$rootScope.title = 'Login';

	$scope.user = {
		username: '',
		password: ''
	};

	session.destroy();

	session.getUser(function(ret){
		console.log(ret);
	})

	$scope.login = function(user) {
		if(user.username != undefined && user.password != undefined) {
			authService.login(user, function(ret){
				if(ret) {
					session.create(ret);
					$location.path('/');
				}
			});
		} else {
			$scope.msg = 'Please enter username and password';
		}
	};
}])