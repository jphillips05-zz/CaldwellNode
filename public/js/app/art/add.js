angular.module('app.art.add', [])

.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/Art/Add/:artistId', {
			templateUrl: '/js/app/art/add.html',
			controller: 'addArtController',
			caseInsensitiveMatch: true,
			access: { requiredLogin: true }
		});
}])

.controller('addArtController', ['$scope', '$rootScope', '$controller', '$routeParams', '$location', 'commonService', 'authService', function($scope, $rootScope, $controller, $routeParams, $location, commonService, authService){
	angular.extend(this, $controller('baseController', {$scope: $scope}));	
	$rootScope.title = 'Add Art',
	$scope.artist = $routeParams.artistId;
	$scope.cats = [];
	$scope.inCat = [];
	$scope.art = {};

	commonService.getCategories(function(cats){
		if(cats) {
			for(var i = 0; i < cats.length; i++) {
				$scope.cats.push(cats[i].name);
			}
		}
	});

	$scope.imageChange = function(el) {
		var file = el.files[0];
		$scope.art.file = file;
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
		       		
		       		$scope.artimageData = canvas.toDataURL("image/jpeg");
		       		$scope.$apply();
	  			};
		   	};
	   		reader.readAsDataURL(file);
		}

	};

	$scope.toggleCat = function(name) {
		var i = $scope.inCat.indexOf(name);
		if(i > -1) {
			$scope.inCat.splice(i, 1);
		} else {
			$scope.inCat.push(name)
		}
	};

	$scope.addArt = function(art) {
		
		$scope.cleanString(art.name, function(name) {
			$scope.art.art = {
				_id: name,
				name: art.name,
				desc: art.desc,
				artist: $scope.artist
			}

			$scope.art.categories = $scope.inCat;
			$scope.art.imageData = $scope.artimageData;
			$scope.art.artist = $scope.artist;
			
			$scope.cleanString($scope.art.file.name, function(name){
				$scope.art.fileName = name;
				authService.addArt($scope.art, function(ret){
					if(ret) {
						console.log(ret);
						//$location.path('/Artist/' + $scope.artist);
					}
				});	
			});
		});
		console.log($scope.art);
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