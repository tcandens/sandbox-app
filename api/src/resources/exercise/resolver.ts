import exercisesConnection from './model'
import { ObjectID } from 'mongodb'

export default {
  Query: {
    exercise: async (root, args, ctx, info) => {
      const exercises = await exercisesConnection
      const found = exercises.findOne({ _id: new ObjectID(args.id) })
      return found
    },
    exercises: async (root, args, ctx, info) => {
      const exercises = await exercisesConnection
      const found = exercises.find({ userId: ctx.state.user._id }).toArray()
      return found
    },
  },
  Mutation: {
    addExercise: async (root, args, ctx, info) => {
      const exercises = await exercisesConnection
      const inserted = await exercises.insertOne({
        ...args.input,
        userId: ctx.state.user._id,
      })
      return inserted.insertedId.toHexString()
    },
    removeExercises: async (root, args, ctx, info) => {
      const exercises = await exercisesConnection
      const removed = await exercises
    },
  },
}
