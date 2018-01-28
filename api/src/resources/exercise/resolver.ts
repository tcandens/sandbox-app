import Exercise from './model'
import { Op } from 'sequelize'

export default {
  Query: {
    exercise: (root, args, ctx, info) => {
      return Exercise.findById(args.id)
    },
  },
}
