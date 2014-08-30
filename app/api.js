var API = function() { };

var db = require('../config/db');

API.prototype.getCategories = function(callback) {
	db.clearParams();
	db.executeSPSingle('GetCategories', function(res){
		callback(res);
	});
};

API.prototype.buildIndex = function(callback) {
	db.executeSPSingle('BuildIndex', function(res) {
		callback(res);
	});
};

API.prototype.getArtistInfo = function(artistId, callback) {

	db.clearParams();
	db.addParam('artistId', artistId);

	db.executeSPMulti('GetArtistInfo', function(res) {
		callback(res);
	})
};

API.prototype.getArtInfo = function(artId, callback) {
	
	db.clearParams();
	db.addParam('artId', artId);

	db.executeSPSingle('GetArtInfo', function(res){
		callback(res);
	});
}

API.prototype.getCategoryInfo = function(categoryId, callback) {
	
	db.clearParams();
	db.addParam('categoryId', categoryId);

	db.executeSPMulti('GetCategoryInfo', categoryId, function(res) {
		callback(res);
	});
};

API.prototype.getEvents = function(callback) {

	db.clearParams();

	db.executeSPSingle('GetEvents', function(res){
		callback(res);
	});
};

API.prototype.getEvent = function(eventId, callback) {

	db.clearParams();
	db.addParam('eventId', eventId);

	db.executeSPMulti('GetEvent', eventId, function(res){
		callback(res);
	});
};

module.exports = new API();