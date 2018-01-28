import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'
import Exercise from './exercise/type'

import { default as userResolver } from './users/resolver'
import { default as exerciseResolver } from './exercise/resolver'

const Query = `
  type Query {
    exercise(id: Int!): Exercise
    user(id: Int!): User
    self: User
  }
`

const SchemaDefinition = `
  schema {
    query: Query
  }
`

const resolvers = merge(
  exerciseResolver,
  userResolver,
)

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Query,
    ...Exercise,
  ],
  resolvers,
})
