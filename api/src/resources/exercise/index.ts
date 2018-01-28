import Exercise from './model'
import { Op } from 'sequelize'
import userType, { Model as User, userLoader } from '../users'
import * as Dataloader from 'dataloader'
import * as createDebug from 'debug'

import { GraphQLObjectType, GraphQLNonNull } from 'graphql'
import { GraphQLString, GraphQLID, GraphQLFloat } from 'graphql/type/scalars'

Exercise.sync({ force: false })

const exerciseLoader = new Dataloader(keys => {
  console.log(keys)
  return User.findAll({
    where: {
      [Op.in]: keys,
    },
  })
})

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
      resolve: (exercise, args, ctx) => userLoader.load(exercise.userId),
    },
  }),
})

export {
  Exercise as Model,
  exerciseLoader,
}
