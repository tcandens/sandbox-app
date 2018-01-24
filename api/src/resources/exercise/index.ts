import Exercise from './model'
import userType, { Model as User } from '../users'
import * as createDebug from 'debug'

import { GraphQLObjectType, GraphQLNonNull } from 'graphql'
import { GraphQLString, GraphQLID, GraphQLFloat } from 'graphql/type/scalars'

Exercise.sync({ force: false })

export default new GraphQLObjectType({
  name: 'Exercise',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLFloat,
    },
    updatedAt: {
      type: GraphQLFloat,
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    user: {
      type: userType,
      resolve: (exercise, args, ctx) => {
        console.dir(exercise)
        return User.findById(exercise.userId)
      },
    },
  }),
})

export {
  Exercise as Model,
}
