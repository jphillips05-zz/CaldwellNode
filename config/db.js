var sql = require('mssql');

var config = {
	user: 'Jason@ibbjl9cteg',
	password: 'Celie123', 
	server: 'ibbjl9cteg.database.windows.net',
	database: 'Cladwellart',
	options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

var db = function(config, sql) {
	
	this.params = [];

	this.clearParams = function() {
		this.params = [];
	};

	this.addParam = function(key, val) {
		this.params.push({key: key, val: val});
	};

	this.getParams = function(){
		return this.params;
	},

	this.executeSPSingle = function(sp, callback) {
		sql.connect(config,function(err) {
			if(err) {
				callback(false);
			}
		});

		var req = new sql.Request();
		if(this.params.length > 0) {
			for(var i=0; i< this.params.length; i++) {
				req.input(this.params[i].key, this.params[i].val);
			};
		}

		req.execute(sp, function(err, recordsets, returnValue){
			sql.close();
			if(err) {
				console.log(err);
				callback(false);
			} else {
				callback(recordsets[0]);
			}
		});
	};

	this.executeSPMulti = function(sp, callback) {
		sql.connect(config,function(err) {
			if(err) {
				callback(false);
			}
		});

		var req = new sql.Request();
		if(this.params.length > 0) {
			for(var i=0; i< this.params.length; i++) {
				req.input(this.params[i].key, this.params[i].val);
			};
		}

		req.execute(sp, function(err, recordsets, returnValue){
			sql.close();
			if(err) {
				console.log(err);
				callback(false);
			} else {
				callback(recordsets);
			}
		});
	}

}

module.exports = new db(config, sql);