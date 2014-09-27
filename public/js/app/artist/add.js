angular.module('app.artist.add', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/Add/Artist', {
			templateUrl: '/js/app/artist/add.html',
			controller: 'addArtistController',
			caseInsensitiveMatch: true,
			access: { requiredLogin: true }
		});
}])

.controller('addArtistController', ['$scope','$rootScope', '$controller', '$location', 'authService', function($scope, $rootScope, $controller, $location, authService) {
	angular.extend(this, $controller('baseController', {$scope: $scope}));

	$rootScope.title = 'Add Artist';
	$scope.bio = '';


	$scope.newArtist = {
		_id: '',
		firstName: '',
		lastName: '',
		bio: '',
		profileImage: '',
		art: []
	};

	$scope.imageChange = function(el) {
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
		 		$scope.file = file;
		 		$scope.$apply();
		 		
		      };
		   };
		   reader.readAsDataURL(file);
		}
	};

	$scope.add = function(artist) {
		if($scope.file !=  undefined) {
			
			$scope.file.name = $scope.cleanString($scope.file.name);
			$scope.file.artist = $scope.cleanString(artist.firstName + artist.lastName);
			//console.log($scope.file);

			authService.updateProfileImage(JSON.stringify($scope.file), function(res) {
				if(res.length > 0) {
					$scope.newArtist = {
						_id: $scope.cleanString(artist.firstName + artist.lastName),
						firstName: artist.firstName,
						lastName: artist.lastName,
						bio: $scope.bio,
						profileImage: $scope.cleanImageUrl(res[(res.length - 1)]),
						art: []
					};

					console.log($scope.newArtist);

					authService.saveArtist($scope.newArtist, function(ret) {
						if(ret) {
							$location.path('/Artist/' + $scope.newArtist._id);
						}
					});

				} else {
					//error
				}
			});

			
		}
	};

	$scope.save = function(txt) {
		$scope.bio = txt;
	};

	$scope.cleanImageUrl = function(s) {
		return s.substr(0, s.indexOf('?'));
	};

	$scope.cleanString = function(s) {
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

		return s;
	};

}]);