import users from './model'
import Exercise from '../exercise/model'

type IArgs = {
  id: number,
}

export default {
  Query: {
    user: async (root, args: IArgs, ctx, info) => {
      console.dir(users)
      const collection = await users
      console.dir(collection)
      return collection.findOne({ id: args.id })
    },
    self: async (root, args, ctx, info) => {
      console.dir(users)
      const collection = await users
      console.dir(collection)
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
