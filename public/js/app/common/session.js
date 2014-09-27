angular.module('app.session', [
    
])

.service('session', ['$rootScope', function ($rootScope) {

    this.create = function (user) {
        sessionStorage.user = JSON.stringify(user);
	};
	this.destroy = function () {
		sessionStorage.clear();
	};
	this.getUser = function (callback) {
	    if (sessionStorage.user != undefined) {
	        callback(JSON.parse(sessionStorage.user));
	    } else {
	        callback(false);
	    }
	};
	return this;
}]);