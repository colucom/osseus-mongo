const path = require('path')

const init = async function (osseus) {
  const mongo = require(path.join(__dirname, '/lib/mongo'))
  return mongo(osseus.config)
}

const start = async function () {

}

module.exports = {
  init: init,
  start: start
}
