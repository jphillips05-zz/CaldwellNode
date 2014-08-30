angular.module('app',[
	'ngRoute',
	'app.services',
	'app.header',
	'app.footer',
	'app.home',
	'app.artist',
	'app.art',
	'app.category',
	'app.about',
	'app.events',
	'app.contact'
	
])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.otherwise('/');
}]);