angular.module('app.events', [
])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/events', {
			templateUrl: '/js/app/events/index.html',
			controller: 'eventIndexController',
			caseInsensitiveMatch: true,
			access: { requiredLogin: false }
		})
		.when('/event/:eventId', {
			templateUrl: '/js/app/events/event.html',
			controller: 'eventController',
			caseInsensitiveMatch: true,
			access: { requiredLogin: false }
		});
}])

.controller('eventIndexController', ['$scope', '$rootScope', 'commonService', function($scope, $rootScope, commonService){
	$rootScope.title = 'Events';
	commonService.getEvents(function(data) {
		console.log(data);
		if(data) {
			$scope.events = data;
		}

	});
}])

.controller('eventController', ['$scope','$rootScope', '$routeParams', 'commonService', function($scope, $rootScope, $routeParams, commonService){
	$scope.eventId = $routeParams.eventId;

	commonService.getEvent($scope.eventId, function(data){
		if(data){
			$rootScope.title = data[0][0].EventName; 
			$scope.event = data[0][0];
			$scope.eventImages = data[1][0]
		}
	});
	
}])