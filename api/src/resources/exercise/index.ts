import Exercise from './model'
import User from '../users/model'
import * as createDebug from 'debug'

Exercise.sync({ force: false })

interface IExercise {
  id: number
  name: string
  description: string
  createdAt: number
  updatedAt: number
}

type instance = {
  get (options: any): any
  destroy (): void,
}

const debug = createDebug('exercise')

export const types = `
  input ExerciseInput {
    name: String!
    description: String
  }

  type Exercise {
    id: ID!
    name: String!
    description: String
    createdAt: Float
    updatedAt: Float
    userId: Int
    creator: User
  }

  type Query {
    exercise(id: ID!): Exercise
    exercises: [Exercise]
    allExercises: [Exercise]
  }

  type Mutation {
    addExercise(input: ExerciseInput): Exercise
    destroyExercise(id: Int!): Exercise
  }
`

export const resolvers = {
  exercise: async ({ id }): Promise<IExercise> => {
    debug('getExercise')
    const model = await Exercise.findById(id)
      .catch((err: Error) => debug('Error fetching exercise: %s. $O', err.message, err.stack))
    const result = model.toJSON()
    result.creator = {
      firstName: 'Jerry',
    }
    return result
  },
  Exercise: {
    creator: (id) => {
      console.log('id')
      return {
        name: 'Harold',
      }
    },
  }
  exercises: async (_, ctx): Promise<[IExercise]> => {
    debug('getExercises')
    const result = await Exercise
      .findAll({
        where: {
          userId: ctx.state.user.id,
        },
      })
      .then((found) => found)
      .catch((err: Error) => debug('Error fetching: %s. %O', err.message, err.stack))
    return result
  },
  allExercises: async (): Promise<[IExercise]> => {
    debug('getAllExercises')
    const result = await Exercise
      .findAll()
      .then(found => found)
      .catch((err: Error) => debug('Error fetching all: %s. %O', err.message, err.stack))
    return result
  },
  addExercise: async ({ input }, ctx): Promise<IExercise> => {
    debug('addExercise')
    const created = await Exercise
      .create(Object.assign(input, { userId: ctx.state.user.id }))
      .then((result: instance) => {
        const saved = result.get({ plain: true })
        if (!saved.id) {
          throw Error('Returned no ID')
        } else {
          return saved
        }
      })
      .catch((err: Error) => debug('Error adding: %s. %O', err.message, err.stack))
    return created
  },
  destroyExercise: async ({ id }) => {
    const destroyed = await Exercise
      .findOne({
        where: {
          id: id,
        },
      })
      .then((model: instance) => {
        if (!model) return false
        model.destroy()
        return model
      })
      .catch(err => console.log(err))
    return destroyed
  },
}

export {
  Exercise as model,
}
