import * as Dataloader from 'dataloader'
import { Op } from 'sequelize'
import User from './model'

import exerciseType, { Model as Exercise, exerciseLoader } from '../exercise'

import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql'
import { GraphQLString, GraphQLID, GraphQLFloat } from 'graphql/type/scalars'

const userLoader = new Dataloader(keys => {
  return Exercise.findAll({
    where: {
      [Op.in]: keys,
    },
  })
})

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
    // exercises: {
    //   type: new GraphQLList(exerciseType),
    //   description: 'List of exercises created by this user',
    //   resolve: (user, args, ctx, info) => exerciseLoader,
    // },
  }),
})

export {
  User as Model,
  userLoader,
}
