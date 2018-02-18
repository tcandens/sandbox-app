import { connect } from '../../connections/mongo'

const users = connect().then(db => {
  db.createCollection('users', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['email', 'authProvider', 'authId', 'firstName', 'lastName'],
        properties: {
          email: {
            bsonType: 'string',
          },
          authProvider: {
            bsonType: 'string',
          },
          authId: {
            bsonType: 'long',
          },
          firstName: {
            bsonType: 'string',
          },
          lastName: {
            bsonType: 'string',
          },
        },
      },
    },
  })

  return db.collection('users')
})

export default users
