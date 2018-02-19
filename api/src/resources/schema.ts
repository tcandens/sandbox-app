import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'
import Exercise from './exercise/type'

import { default as userResolver } from './users/resolver'
import { default as exerciseResolver } from './exercise/resolver'

const Query = `
  input ExerciseInput {
    name: String!
    description: String
  }

  type Query {
    exercise(id: Int!): Exercise
    exercises: [Exercise]
    user(id: Int!): User
    self: User
  }

  type Mutation {
    addExercise(input: ExerciseInput): String
    removeExercises(ids: [String]): Int
  }
`

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`

const resolvers = merge(exerciseResolver, userResolver)

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, Query, ...Exercise],
  resolvers,
})
