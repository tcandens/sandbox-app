import { connect } from '../../connections/mongo'

const exercises = connect().then(db => {
  const collection = 'exercises'

  db.createCollection(collection, {
    validator: {
      $jsonSchema: {
        properties: {
          name: {
            bsonType: 'string',
          },
          description: {
            bsonType: 'string',
          },
          userId: {
            bsonType: 'objectId',
          },
          deleted: {
            bsonType: 'bool',
          },
        },
        required: ['name', 'userId'],
        uniqueItems: ['name'],
      },
    },
  })

  return db.collection(collection)
})

export default exercises
