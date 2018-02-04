import User from './model'
import Exercise from '../exercise/model'

type IArgs = {
  id: number,
}

export default {
  Query: {
    user: (root, args: IArgs, ctx, info) => {
      return User.findById(args.id)
    },
    self: (root, args, ctx, info) => {
      return User.findById(ctx.state.user.id)
    },
  },
  User: {
    exercises (user) {
      return Exercise.fromUser(user.id)
    },
  },
}
