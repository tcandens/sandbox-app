import Exercise from './model'
import * as createDebug from 'debug'

Exercise.sync({ force: false })

interface IExercise {
  id: number
  name: string
  description: string
  createdAt: number
  updatedAt: number
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
  }

  type Query {
    getExercises: [Exercise]
    getAllExercises: [Exercise]
  }

  type Mutation {
    addExercise(input: ExerciseInput): Exercise
    destroyExercise(id: Int!): Exercise
  }
`

export const resolvers = {
  getExercises: async (_, ctx): Promise<[IExercise]> => {
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
  getAllExercises: async (): Promise<[IExercise]> => {
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
      .then(result => {
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
      .then(model => {
        if (!model) return false
        model.destroy()
        return model
      })
      .catch(err => console.log(err))
    return destroyed
  },
}
