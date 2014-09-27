angular.module('app.authService', [])

.service('authService', ['$rootScope','$http', function($rootScope, $http){
	
	this.addArt = function(img, callback) {
		$http({method: 'POST', url: '/api/artist/addArt', data: img })
		.success(function(data, status){
			callback(data);
		})
		.error(function(data, status) {
			callback(false);
		});
	};

	this.isLoggedIn = function(){
		return $rootScope.isLoggedIn;
	};

	this.login = function (user, callback){
		$http({method: 'POST', url:'/api/auth/', data: user	})
		.success(function(data, status){
			callback(data);
		})
		.error(function(data, status){
			callback(false);
		});
	};

	this.logout = function (callback) {
		sessionStorage.clear();
	}

	this.saveArtist = function(artist, callback) {
		$http({method: 'POST', url: '/api/artist/update', data: artist})
		.success(function(data, satus) {
			callback(data);
		})
		.error(function(data, status){
			callback(false);
		});
	};

	// this.saveArtistBio = function(artist, callback) {
	// 	$http({method: 'POST', url: '/api/artist/updateBio/', data: artist})
	// 	.success(function(data, satus) {
	// 		callback(data);
	// 	})
	// 	.error(function(data, status){
	// 		callback(false);
	// 	});
	// };

	this.updateProfileImage = function(img, callback) {
		$http({method: 'POST', url: '/api/artist/updateProfile', data: img })
		.success(function(data, status){
			callback(data);
		})
		.error(function(data, status) {
			callback(false);
		});
	};

}])