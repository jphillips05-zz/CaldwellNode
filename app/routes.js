module.exports = function(app, api) {

	var async = require('async');

	var conf = require('../config.js');

	var AWS = require('aws-sdk');
		process.env.AWS_ACCESS_KEY_ID=conf.get('aws.dev.accessKey');
		process.env.AWS_SECRET_ACCESS_KEY=conf.get('aws.dev.secretKey');

	AWS.config.region = '';
	var s3 = new AWS.S3({
		params: {
			Bucket: conf.get('aws.dev.bucket')
		}
	});

	var MongoClient = require('mongodb').MongoClient;
	var Server = require('mongodb').Server;
	var mongoHost = conf.get('mongo.dev'); //A
	var mongoPort = 27017; 
	var collectionDriver = require('./collectionDriver').CollectionDriver;
 
	var mongoClient = new MongoClient.connect(mongoHost, function (err, db){
		if(!err) {
			collectionDriver = new CollectionDriver(db);
		}
	});

	app.post('/api/auth', function(req, res) {

		var stormpath = require('stormpath');

		// Find the user's home directory (works on both Windows and *nix):
		var home = process.env[(process.platform === 'win32' ? 'USERPROFILE' : 'HOME')];
		var apiKeyFilePath = home + '/stormpath/apiKey.properties';

		// Will be available after the properties file is asynchronously loaded from
		// disk:
		var client;

		stormpath.loadApiKey(apiKeyFilePath, function apiKeyFileLoaded(err, apiKey) {
		    client = new stormpath.Client({apiKey: apiKey});
		    

			var authRequest = {
		  		username: req.body.username,
		  		password: req.body.password
			};

			client.getApplication('https://api.stormpath.com/v1/applications/2i3VxJjCnEVAviZhyU4j9f', function(err, app) {
		  		
		  		var createdApp = app;

				createdApp.authenticateAccount(authRequest, function onAuthcResult(err, result) {

				  //if successful, you can obtain the account by calling result.getAccount:

				  	return result.getAccount(function(err2, account) { //this is cached and will execute immediately (no server request):
				    	if(err) {
				    		res.send(400, err2);
				    	} else {
				    		res.send(200, account);
				    	}
				  	});
				});

			});	
		});				

	});

	app.post('/api/artist/addArt', function(req, res) {
		//add art to art
		//add art to category
		var art = req.body.art;
		art.href = '//s3.amazonaws.com/' + conf.get('aws.dev.bucket') + '/' + req.body.artist + '/art/' + req.body.file.name;

		async.series([
			//check artist buckets
			function(callback) {
				var params = {
					Bucket: conf.get('aws.dev.bucket') + '/' + req.body.artist + '/'
				};
				s3.headBucket(params, function(err, data){
					if(err) {
						var bucketParams = {
							Bucket: conf.get('aws.dev.bucket') + '/' + req.body.artist + '/',
							ACL: 'public-read-write'
						};

						s3.createBucket(bucketParams, function(err, data){
							if(err) {
								callback(err);
							} else {
								callback();
							}
						});

					} else {
						callback();
					}
				});
			},
			//check artist/art bucket
			function(callback){
				var params = {
					Bucket: conf.get('aws.dev.bucket') + '/' + req.body.artist + '/art/'
				};
				s3.headBucket(params, function(err, data) {
					if(err) {
						var bucketParams = {
							Bucket: conf.get('aws.dev.bucket') + '/' + req.body.artist + '/art/',
							ACL: 'public-read-write'
						};

						s3.createBucket(bucketParams, function(err, data) {
							if(err) {
								callback(err);
							} else {
								callback();
							}
						});

					} else {
						callback();
					}
				});
			},
			// //upload
			function(callback) {

				var data = {
					ACL: 'public-read-write',
					Body: new Buffer(req.body.imageData.replace(/^data:image\/\w+;base64,/, ""),'base64'),
					ContentType: req.body.file.type,
					Key: req.body.artist + '/art/' + req.body.file.name			
				};

				s3.putObject(data, function(err, data) {
					if(err) {
						callback(err);
					} else {
						callback();
					}
				});
			},
			//add art to art
			function(callback) {
				collectionDriver.update('art', art, function(err, obj) {
					if(err) {
						callback(err);
					} else {
						callback(null, obj);
					}
				});
			},
			//add art to artist
			function(callback) {
				collectionDriver.get('artist', req.body.artist, function(err, data) {
					if(err) {
						callback(err);
					} else {
						var _artist = data,
							id = _artist.art.indexOf(art._id);
						if(id == -1) {
							_artist.art.push(art._id);
							collectionDriver.update('artist', _artist, function(err2, data){
								if(err2) {
									callback(err2);
								} else {
									callback();
								}
							});
						}
					}
				});
			},

			//add art to category
			function(callback) {
				for(var i = 0; i < req.body.categories.length; i++) {
					collectionDriver.get('category', req.body.categories[i], function(err, data){
						if(err) {
							callback(err);
						} else {
							var cat = data;
							var id = cat.art.indexOf(art._id);
							if(id == -1) {
								cat.art.push(art._id);
								collectionDriver.update('category', cat, function(err, obj) {
									if(err) {
										callback(err);
									}
								});
							} 
						}
					});
				}
				callback(null, {success: true});
			}
		], 
		function(err, data){
			if(err) {
				console.log(err);
				res.send(400, err);
			} else {
				res.send(200, data);
			}
		});

	});

	app.post('/api/artist/updateProfile', function(req, res) {
		
		//console.log(req.body.artist);
		async.series([
			//check artist buckets
			function(callback) {
				var params = {
					Bucket: conf.get('aws.dev.bucket') + '/' + req.body.artist + '/'
				};
				s3.headBucket(params, function(err, data){
					if(err) {
						var bucketParams = {
							Bucket: conf.get('aws.dev.bucket') + '/' + req.body.artist + '/',
							ACL: 'public-read-write'
						};

						s3.createBucket(bucketParams, function(err, data){
							if(err) {
								callback(err);
							} else {
								callback();
							}
						});

					} else {
						callback();
					}
				});
			},
			//check artist/art bucket
			function(callback){
				var params = {
					Bucket: conf.get('aws.dev.bucket') + '/' + req.body.artist + '/profile/'
				};
				s3.headBucket(params, function(err, data){
					if(err) {
						var bucketParams = {
							Bucket: conf.get('aws.dev.bucket') + '/' + req.body.artist + '/profile/',
							ACL: 'public-read-write'
						};

						s3.createBucket(bucketParams, function(err, data){
							if(err) {
								callback(err);
							} else {
								callback();
							}
						});

					} else {
						callback();
					}
				});
			},
			// //upload
			function(callback) {

				var data = {
					ACL: 'public-read-write',
					Body: new Buffer(req.body.data.replace(/^data:image\/\w+;base64,/, ""),'base64'),
					ContentType: req.body.type,
					Key: req.body.artist + '/profile/' + req.body.name			
				};

				s3.putObject(data, function(err, data) {
					if(err) {
						callback(err);
					} else {
						callback();
					}
				});
			}, 
			//return temp url to image
			function(callback) {
				var p = {
					Bucket: 'caldwelldev',
					Key: req.body.artist + '/profile/' + req.body.name
				};
				s3.getSignedUrl('getObject', p, function(err, data){
					if(err) {
						callback(err);
					} else {
						callback(null, data);
					}
				});
			}
		], 
		function(err, data){
			if(err) {
				console.log(err);
				res.send(400, err);
			} else {
				res.send(200, data)
			}
		});

	});

	
	app.post('/api/artist/update', function(req, res) {
		collectionDriver.update('artist', req.body, function(err, obj) {
			if(err) {
				res.send(400, err);
			} else {
				res.send(200, obj);
			}
		});
	});

	app.get('/api/:collection', function(req, res) { //A
	   var params = req.params; //B
	   collectionDriver.findAll(req.params.collection, function(error, objs) { //C
			if (error) { 
    	  		res.send(400, error); 
	  		} else { 
          		res.set('Content-Type','application/json'); //G
          		res.send(200, objs); //H
          	}
	   	});
	});
	 
	app.get('/api/:collection/:entity', function(req, res) { //I
	   var params = req.params;
	   var entity = params.entity;
	   var collection = params.collection;
	   if (entity) {
	       collectionDriver.get(collection, entity, function(error, objs) { //J
	          if (error) { res.send(400, error); }
	          else { res.send(200, objs); } //K
	       });
	   } else {
	      res.send(400, {error: 'bad url', url: req.url});
	   }
	});

};