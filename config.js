var convict = require('convict');

var conf = convict({
	env: {
		doc: "The applicaton environment.",
	    format: ["production", "development", "test"],
	    default: "development",
	    env: "NODE_ENV"
	},
	mongo: {
		dev: {
			doc: 'Dev DB',
			format: 'url',
			default: 'mongodb://Caldwell:Celie123@kahana.mongohq.com:10000/app29059228',
			evn: 'MONGO_DEV'
		}
	},
	aws: {
		dev: {
			accessKey: {
				doc: 'aws access key dev',
				default: 'AKIAIF7QP4POO2IB5B2A',
				env: 'DEV_AWS_ACCESS_KEY_ID'
			},
			secretKey: {
				doc: 'secret Key',
				default: 'mQlSvFyaZLHPHVou+sdPeaTnGzbQj8weCWlcS/6W',
				env: 'DEV_AWS_SECRET_ACCESS_KEY'
			},
			bucket: {
				doc: 'bucket key',
				default: 'caldwelldev',
				env: 'DEV_AWS_ROOT_Bucket'
			}
		},
		prod: {
			accessKey: {
				doc: 'aws access key dev',
				default: 'AKIAIF7QP4POO2IB5B2A',
				env: 'AWS_ACCESS_KEY_ID'
			},
			secretKey: {
				doc: 'secret Key',
				default: 'mQlSvFyaZLHPHVou+sdPeaTnGzbQj8weCWlcS/6W',
				env: 'AWS_SECRET_ACCESS_KEY'
			},
			bucket: {
				doc: 'bucket key',
				default: 'caldwell',
				env: 'AWS_ROOT_Bucket'
			}
		}
	}	
});


conf.validate();

module.exports = conf;