const mongoose = require('mongoose')

const getOptions = (config) => {
  // if mongoose options object isn't null and isn't empty, return options object
  if (config && !(Object.keys(config).length === 0 && config.constructor === Object)) {
    return {
      user: config.user,
      pass: config.pass
    }
  }
  return
}

module.exports = function (config) {
  return new Promise((resolve, reject) => {
    if (!config.osseus_mongo.uri) {
      return reject(new Error('mongo uri missing'))
    }
    console.log(`mongodb uri: ${config.osseus_mongo.uri}`)
    const options = getOptions(config.osseus_mongo)
    console.log(`mongodb options: ${JSON.stringify(options)}`)
    const db = mongoose.createConnection(config.osseus_mongo.uri, options)
    db.once('open', () => {
      console.log(`db connection open`)
      db.mongoose = mongoose
      resolve(db)
    })
    db.on('error', (err) => {
      reject(err)
    })
  })
}
