exports.s3 = function() {
	var AWS = require('aws-sdk');
		process.env.AWS_ACCESS_KEY_ID=conf.get('aws.dev.accessKey');
		process.env.AWS_SECRET_ACCESS_KEY=conf.get('aws.dev.secretKey');

	AWS.config.region = '';
	var s3 = new AWS.S3({
		params: {
			Bucket: conf.get('aws.dev.bucket')
		}
	});
};
