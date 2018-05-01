const mongoose = require('mongoose');

const verifyUri = (uri) => {
	if(uri){
		return uri;
	}
	else throw new Error("no connection string provided");
};

const getOptions = (config) => {
	let mongo_config = config.osseus_mongo;

	//if mongoose options object isn't null and isn't empty, return options object
	if(mongo_config && !(Object.keys(mongo_config).length === 0 && mongo_config.constructor === Object)){
		return {
			user: mongo_config.user,
			pass: mongo_config.pass
		};
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
		console.log('db uri:', uri);
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