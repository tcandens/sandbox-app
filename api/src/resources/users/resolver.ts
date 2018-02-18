import userConnection from './model'
import exerciseConnection from '../exercise/model'
import { ObjectID } from 'mongodb'

type IArgs = {
  _id: number
}

export default {
  Query: {
    user: async (root, args: IArgs, ctx, info) => {
      const users = await userConnection
      const user = await users.findOne({ _id: new ObjectID(args._id) })
      return user
    },
    self: async (root, args, ctx, info) => {
      const users = await userConnection
      const user = await users.findOne({
        _id: new ObjectID(ctx.state.user._id),
      })
      return user
    },
  },
  User: {
    exercises: async user => {
      const exercises = await exerciseConnection
      const found = exercises
        .find({
          userId: user._id,
        })
        .toArray()
      return found
    },
  },
}
