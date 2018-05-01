const mongoose = require('mongoose');

const verifyUri = (uri) => {
	if(uri){
		return uri;
	}
	else throw new Error("no connection string provided");
};

const getOptions = (config) => {
	let options = config.osseus_mongo.options;

	//if mongoose options object isn't null and isn't empty, return options object
	if(options && !(Object.keys(options).length === 0 && options.constructor === Object)){
		return options;
	}

	return null;
};

module.exports = async function (config) {
	let uri;
	try {
		uri = verifyUri(config.osseus_mongo.uri);
	} catch (error) {
		throw error
	}

	let options = getOptions(config);

	return new Promise((resolve, reject) => {
		let db = mongoose.createConnection(uri, options);
		db.once('open', () => {
			console.log('db connection open');
			db.mongoose = mongoose
			resolve(db);
		});
		db.on('error', (err) => {
			reject(err);
		});
	});
};