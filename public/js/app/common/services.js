angular.module('app.services', [
])

.service('commonService', ['$http', function($http){
	this.getCategories = function(callback){
		$http({method: 'GET',url: '/api/categories'})
		.success(function(data, status) {
			//console.log(data,status);
			callback(data);
		})
		.error(function(data, status) {
			console.log(data,status);
			callback(false);
		});
	};
}])