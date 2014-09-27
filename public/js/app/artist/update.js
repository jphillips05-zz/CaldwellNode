angular.module('app.artist.update', [])

.config(['$routeProvider',function($routeProvider) {
	$routeProvider
		.when('/Artist/Update/:artistId', {
			templateUrl: '/js/app/artist/update.html',
			controller: 'artistUpdateController',
			caseInsensitiveMatch: true,
			access: { requiredLogin: true }
		});
}])

.controller('artistUpdateController', ['$scope','$rootScope', '$routeParams', '$controller', '$location', 'commonService', 'authService', function($scope, $rootScope, $routeParams, $controller, $location, commonService, authService){
	angular.extend(this, $controller('baseController', {$scope: $scope}));	

	$rootScope.title = 'Update Artist';
	$scope.msg = '';
	$scope.artistId = $routeParams.artistId;
	$scope.artist = {};
	$scope.Bio = '';
	$scope.arts = [];

	commonService.artistInfo($scope.artistId, function(res){
		if(res) {
			$scope.artist = res;
			$scope.Bio = res.bio;
			for(var i=0; i<res.art.length; i++) {
				commonService.getArt($scope.artist.art[i], function(artData){
					if(artData){
						$scope.arts.push(artData);
					}
				});
			}
		} else {
			$location.path('/');
		}
	});

	$scope.saveBio = function (msg) {
		$scope.artist.bio = $scope.Bio
		
		authService.saveArtist($scope.artist, function(res){
			if(res) {
				$scope.msg = msg;
			} else {
				$scope.msg = 'Something went wrong.';
			}
		});
	};

	$scope.profileImageChange = function(el){
		//update then show

		var file = el.files[0];
		if(file.type.match('image/*')) {
			var reader = new FileReader();
		    reader.onloadend = function() {
		 
		    var tempImg = new Image();
		    tempImg.src = reader.result;
		    tempImg.onload = function() {
		 
		        var MAX_WIDTH = 1000,
		        	MAX_HEIGHT = 1000,
		        	tempW = tempImg.width,
		        	tempH = tempImg.height;
		        
		        if (tempW > tempH) {
		            if (tempW > MAX_WIDTH) {
		               tempH *= MAX_WIDTH / tempW;
		               tempW = MAX_WIDTH;
		            }
		        } else {
		            if (tempH > MAX_HEIGHT) {
		               tempW *= MAX_HEIGHT / tempH;
		               tempH = MAX_HEIGHT;
		            }
		        }
		 
		        var canvas = document.createElement('canvas');
		        canvas.width = tempW;
		        canvas.height = tempH;
		        var ctx = canvas.getContext("2d");
		        ctx.drawImage(this, 0, 0, tempW, tempH);
		        var dataURL = canvas.toDataURL("image/jpeg");
		 		file.data = dataURL;
		 		
		 		$scope.cleanString(file.name, function(n){
	 				file.fileName = n;
	 				file.artist = $scope.artist._id;
	 				authService.updateProfileImage(JSON.stringify(file), function(ret) { 
	 					if(ret) {
                    		$scope.newProfileImage = ret[3];
                    		$scope.artist.profileImage = '//s3.amazonaws.com/caldwelldev/' + $scope.artistId + '/profile/' + file.fileName;
                    		$scope.saveBio('Profile saved.');
                    	}
	 				});
		 		});
		      };
		   };
		   reader.readAsDataURL(file);
		}
	};

	$scope.save = function(bio) {
		$scope.Bio = bio;
	};

	$scope.cleanString = function(s, callback) {
		s = s
			.replace(/ /g, '')
			.replace(/!/g, '')
			.replace(/@/g, '')
			.replace(/#/g, '')
			.replace(/$/g, '')
			.replace(/%/g, '')
			.replace(/^/g, '')
			.replace(/&/g, '')
			.replace(/\*/g, '')
			//.replace(/(/g, '')
			//.replace(/)/, '')
			.replace(/_/g, '')
			.replace(/-/g, '')
			.replace(/\+/g, '')
			.replace(/=/g, '')
			.replace(/\{/g, '')
			.replace(/\[/g, '')
			.replace(/\}/g, '')
			.replace(/]/g, '')
			.replace(/\|/g, '')
			.replace(/~/g, '')
			.replace(/`/g, '')
			.replace(/\?/g, '')
			.replace(/</g, '')
			.replace(/>/g, '')
			.replace(/,/g, '')
			.replace(/\//g, '');

		callback(s);
	};
}]);