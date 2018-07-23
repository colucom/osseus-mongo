const path = require('path')

const init = async (osseus) => {
  return new Promise(async (resolve, reject) => {
    const mongo = await require(path.join(__dirname, '/lib/mongo'))(osseus.config).catch(err => { reject(err) })
    resolve(mongo)
  })
}

module.exports = {
  init: init
}
