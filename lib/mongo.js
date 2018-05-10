const mongoose = require('mongoose')

const verifyUri = (uri) => {
  if (uri) {
    return uri
  } else {
    throw new Error('no connection string provided')
  }
}

const getOptions = (config) => {
  // if mongoose options object isn't null and isn't empty, return options object
  if (config.osseus_mongo && !(Object.keys(config.osseus_mongo).length === 0 && config.osseus_mongo.constructor === Object)) {
    return {
      user: config.osseus_mongo.user,
      pass: config.osseus_mongo.pass
    }
  }

  return null
}

module.exports = async function (config) {
  let uri
  try {
    uri = verifyUri(config.osseus_mongo.uri)
  } catch (error) {
    throw error
  }

  let options = getOptions(config)

  return new Promise((resolve, reject) => {
    console.log('db uri:', uri)
    let db = mongoose.createConnection(uri, options)
    db.once('open', () => {
      console.log('db connection open')
      db.mongoose = mongoose
      resolve(db)
    })
    db.on('error', (err) => {
      reject(err)
    })
  })
}
