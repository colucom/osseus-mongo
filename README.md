[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

# Osseus Mongo

[mongoose](http://mongoosejs.com/) based osseus [mongodb](https://www.mongodb.com/) connection module

## Install
```bash
$ npm install @colucom/osseus-mongo
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

## Contributing
Please see [contributing guidelines](https://github.com/colucom/osseus-mongo/blob/master/.github/CONTRIBUTING.md).

## License
Code released under the [MIT License](https://github.com/colucom/osseus-mongo/blob/master/LICENSE).
