import exercisesConnection from './model'
import { ObjectID, Timestamp } from 'mongodb'

export default {
  Query: {
    exercise: async (root, args, ctx, info) => {
      const exercises = await exercisesConnection
      const found = exercises.findOne({ _id: new ObjectID(args.id) })
      return found
    },
    exercises: async (root, args, ctx, info) => {
      const exercises = await exercisesConnection
      const found = exercises
        .find({
          userId: ctx.state.user._id,
          deleted: {
            $ne: true,
          },
        })
        .toArray()
      return found
    },
  },
  Mutation: {
    addExercise: async (root, args, ctx, info) => {
      const exercises = await exercisesConnection
      const inserted = await exercises.insertOne({
        ...args.input,
        userId: ctx.state.user._id,
        updatedAt: Date.now(),
        deleted: false,
      })
      return inserted.insertedId.toHexString()
    },
    removeExercises: async (root, args, ctx, info) => {
      const exercises = await exercisesConnection
      try {
        const removed = await exercises.updateMany(
          {
            _id: {
              $in: args.ids.map(id => new ObjectID(id)),
            },
          },
          {
            $set: {
              deleted: true,
              updatedAt: Date.now(),
            },
          }
        )
        return removed.matchedCount
      } catch (error) {
        console.log(error.stack)
      }
    },
  },
  Subscription: {
    exerciseAdded: {
      subscribe: () => {},
      resolve: payload => ({
        ...payload,
      }),
    },
  },
}
