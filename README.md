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
* Model file (example: models/_**MyModel**_.js): 
```javascript
module.exports = (osseus) => {
    const db = osseus.mongo
    const mongoose = osseus.mongo.mongoose
    const Schema = mongoose.Schema

    const myModelSchema = new Schema({
        name: String
    });
    const MyModel = db.model('MyModel', myModelSchema)
    
    osseus.mongo.appModels = osseus.mongo.appModels || {}
    osseus.mongo.appModels['MyModel'] = MyModel
}
```
* Require model after osseus init: `require('./models/MyModel')(osseus);`
* You can access models by osseus.mongo.appModels['_**modelName**_'] from anywhere in the application. For example:
```javascript
module.exports = (osseus) => {
    return {
        examplePOST: (req, res, next) => {
            const newMyModel = new osseus.mongo.appModels.MyModel({
                name: 'Someone'
            })

            newMyModel.save()
                .then(() => {
                    console.log('Document successfully saved')
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
