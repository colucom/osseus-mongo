const mongoose = require('mongoose')

const getOptions = (config) => {
  // if mongoose options object isn't null and isn't empty, return options object
  if (config && config.options && !(Object.keys(config.options).length === 0 && config.options.constructor === Object)) {
    return config.options
  } else {
    // these are default options
    return {
      keepAlive: 1,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  }
}

module.exports = function (config) {
  return new Promise(async (resolve, reject) => {
    if (!config.osseus_mongo.uri) {
      return reject(new Error('mongo uri missing'))
    }
    console.log(`mongodb uri: ${config.osseus_mongo.uri}`)
    const options = getOptions(config.osseus_mongo)
    console.log(`mongodb options: ${JSON.stringify(options)}`)
    mongoose.Promise = global.Promise
   
    const db = await mongoose.createConnection(config.osseus_mongo.uri, {...options, useNewUrlParser: true})
    //db.mongoose = mongoose
    resolve(db)
    
  })
}
