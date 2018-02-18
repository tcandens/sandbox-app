import { MongoClient } from 'mongodb'

const url = 'mongodb://mongo:27017'
const dbName = 'tracker'

let _db

export async function connect () {
  if (_db) {
    return _db
  } else {
    const client = await MongoClient.connect(url)
    _db = client.db(dbName)
    return _db
  }
}
