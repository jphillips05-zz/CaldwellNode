angular.module('app.services', [
])

.service('commonService', ['$http', function($http){
	this.getArt = function(art, callback) {
		$http({method: 'GET', url: '/api/art/' + art})
		.success(function(data, status){
			callback(data);
		})
		.error(function(data, status){
			callback(false);
		});
	};

	this.getCategories = function(callback){
		$http({method: 'GET',url: '/api/category'})
		.success(function(data, status) {
			callback(data);
		})
		.error(function(data, status) {
			callback(false);
		});
	};

	this.buildIndex = function(callback) {
		$http({method: 'GET', url: '/api/artist'})
		.success(function(data, status){
			callback(data);
		})
		.error(function(data, status){
			callback(false);
		});
	};

	this.artistInfo = function(artistId, callback) {
		$http({method: 'GET', url: '/api/artist/' + artistId})
		.success(function(data, status) {
			callback(data);
		})
		.error(function(data, status){
			callback(false);
		});
	};

	this.artInfo = function(artId, callback) {
		$http({method: 'GET', url: '/api/art/' + artId})
		.success(function(data, status){
			callback(data);
		})
		.error(function(data, status){
			callback(false);
		});
	};

	this.getCategoryInfo = function(categoryId, callback) {
		$http({method: 'GET', url: '/api/category/' + categoryId})
		.success(function(data, status){
			callback(data);
		})
		.error(function(data, status){
			callback(false);
		});
	};

	this.getEvents = function(callback) {
		$http({method: 'GET', url: '/api/events'})
		.success(function(data, status){
			callback(data);
		})
		.error(function(data, status){
			callback(false);
		})
	};

	this.getEvent = function(eventId, callback) {
		$http({method: 'GET', url: '/api/event/' + eventId})
		.success(function(data, status){
			callback(data);
		})
		.error(function(data, status) {
			callback(false);
		});
	};

	this.sendCommentEmail = function(email, callback) {
		//send email
	};

}]);