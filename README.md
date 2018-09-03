[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

# Osseus Mongo

[mongoose](http://mongoosejs.com/) based osseus [mongodb](https://www.mongodb.com/) connection module

## Install
```bash
$ npm install osseus-mongo
```

## Usage

#### Configuration

* `OSSEUS_MONGO_URI` - connection uri string
* `OSSEUS_MONGO_OPTIONS` - connection options object, default is:
```json
{
  "keepAlive": 1,
  "connectTimeoutMS": 30000,
  "socketTimeoutMS": 30000,
  "useMongoClient": true
}
```

#### Simple usage

* Configuration file / secret: `OSSEUS_MONGO_URI: 'mongodb://<mongosever>:<port>/<databasename>'`
* Model file (example: models/User.js): 
```javascript
module.exports = (osseus) => {
    const db = osseus.mongo
    const mongoose = osseus.mongo.mongoose
    const Schema = mongoose.Schema

    const userSchema = new Schema({
        name: String
    });
    const User = db.model('User', userSchema)
    
    osseus.mongo.myModels = osseus.mongo.myModels || {}
    osseus.mongo.myModels.User = User
}
```
* Require model after osseus init: `require('./models/User')(osseus);`
* Controller file:
```javascript
module.exports = (osseus) => {
    return {
        examplePOST: (req, res, next) => {
            const newUser = new osseus.mongo.myModels.User({
                name: 'Someone'
            })

            newUser.save()
                .then(() => {
                    console.log('User successfully saved')
                })
                .catch(err => {
                    throw err
                })
        }
    }
}
```



## Contributing
Please see [contributing guidelines](https://github.com/colucom/osseus-mongo/blob/master/.github/CONTRIBUTING.md).

## License
Code released under the [MIT License](https://github.com/colucom/osseus-mongo/blob/master/LICENSE).
