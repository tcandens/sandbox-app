import exercisesConnection from './model'
import { PubSub } from 'graphql-subscriptions'
import { ObjectID, Timestamp } from 'mongodb'

const pubSub = new PubSub()

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
      const newExercise = {
        ...args.input,
        userId: ctx.state.user._id,
        updatedAt: Date.now(),
        deleted: false,
      }
      const exercises = await exercisesConnection
      const inserted = await exercises.insertOne(newExercise)
      const _id = inserted.insertedId.toHexString()
      pubSub.publish('exercises', {
        added: {
          ...newExercise,
          _id,
        },
      })
      return _id
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
      subscribe: () => {
        return pubSub.asyncIterator('exercises')
      },
      resolve: payload => payload.added,
    },
  },
}
