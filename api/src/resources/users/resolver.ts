import users from './model'
import Exercise from '../exercise/model'

type IArgs = {
  id: number,
}

export default {
  Query: {
    user: async (root, args: IArgs, ctx, info) => {
      const collection = await users
      return collection.findOne({ id: args.id })
    },
    self: async (root, args, ctx, info) => {
      const collection = await users
      return collection.findOne({ id: ctx.state.user.id })
    },
  },
  User: {
    exercises (user) {
      return Exercise.findAll({
        where: {
          userId: user.id,
        },
      })
    },
  },
}
