var ObjectID = require('mongodb').ObjectID;

CollectionDriver = function(db) {
  this.db = db;
};

CollectionDriver.prototype.update = function(col, data, callback) {
  this.db.collection(col, function(err, the_collection) {
    if(err) {
      callback(err);
    } else {
      the_collection.save(data, function(err2, c, obj) {
        if(err2) {
          callback(err2);
        } else {
          callback(null, obj);
        }
      });
    }
  });
};

CollectionDriver.prototype.updateBio = function(artist, callback) {
  this.db.collection('artist', function(err, the_collection) {
    if(err) {
      callback(err);
    } else {
      the_collection.update({_id: artist._id}, artist, function(err2, c, obj) {
        if(err2) {
          callback(err2);
        } else {
          callback(null, obj);
        }
      });
    }
  });
};


CollectionDriver.prototype.getCollection = function(collectionName, callback) {
  this.db.collection(collectionName, function(error, the_collection) {
    if( error ) callback(error);
    else callback(null, the_collection);
  });
};

//find all objects for a collection
CollectionDriver.prototype.findAll = function(collectionName, callback) {
    this.getCollection(collectionName, function(error, the_collection) { //A
      if( error ) callback(error)
      else {
        the_collection.find().toArray(function(error, results) { //B
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//find a specific object
CollectionDriver.prototype.get = function(collectionName, id, callback) { //A
    this.getCollection(collectionName, function(error, the_collection) {
        if (error) callback(error)
        else {
            the_collection.findOne({'_id':id}, function(error,doc) { //C
            	if (error) callback(error)
            	else callback(null, doc);
            });
        }
    });
}

//find a specific object
CollectionDriver.prototype.getWithObjId = function(collectionName, id, callback) { //A
    this.getCollection(collectionName, function(error, the_collection) {
        if (error) callback(error)
        else {
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$"); //B
            if (!checkForHexRegExp.test(id)) callback({error: "invalid id"});
            else the_collection.findOne({'_id':ObjectID(id)}, function(error,doc) { //C
            	if (error) callback(error)
            	else callback(null, doc);
            });
        }
    });
}

module.exports = new CollectionDriver();