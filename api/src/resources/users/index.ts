import User from './model'

import exerciseType, { Model as Exercise } from '../exercise'

import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql'
import { GraphQLString, GraphQLID, GraphQLFloat } from 'graphql/type/scalars'

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User first name',
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User last name',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Users email address',
    },
    exercises: {
      type: new GraphQLList(exerciseType),
      description: 'List of exercises created by this user',
      resolve: (user, args, ctx, info) => {
        return Exercise.findAll({
          where: {
            userId: user.id,
          },
        })
      },
    },
  }),
})

export {
  User as Model,
}
