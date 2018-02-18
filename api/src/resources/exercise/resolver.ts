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
      const found = exercises.find({}).toArray()
      return found
    },
  },
  Mutation: {
    addExercise: async (root, args, ctx, info) => {
      const exercises = await exercisesConnection
      const inserted = await exercises.insertOne(args.input)
      return inserted.insertedId.toHexString()
    },
  },
}
