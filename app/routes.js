module.exports = function(app, api) {

	app.get('/api/categories', function(req, res){
		api.getCategories(function(r){
			res.json(r);
		});
	});

	app.get('/api/buildIndex', function(req, res) {
		api.buildIndex(function(r) {
			res.json(r);
		});
	});

	app.get('/api/artist/:artistId', function(req, res) {
		api.getArtistInfo(req.params.artistId, function(r) {
			res.json(r);
		});
	});

	app.get('/api/art/:artId', function(req, res) {
		api.getArtInfo(req.params.artId, function(r) {
			res.json(r);
		});
	});

	app.get('/api/category/:categoryId', function(req, res) {
		api.getCategoryInfo(req.params.categoryId, function(r){
			res.json(r);
		});
	});

	app.get('/api/events', function(req, res){
		api.getEvents(function(r){
			res.json(r);
		});
	});

	app.get('/api/event/:eventId', function(req, res){
		api.getEvent(req.params.eventId, function(r){
			res.json(r);
		})
	});
};