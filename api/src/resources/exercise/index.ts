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
  }

  type Query {
    getAllExercises: [Exercise]
  }

  type Mutation {
    addExercise(input: ExerciseInput): Exercise
    destroyExercise(id: Int!): Exercise
  }
`

export const resolvers = {
  getAllExercises: async (): Promise<[IExercise]> => {
    debug('getAllExercises')
    const result = await Exercise
      .findAll()
      .then((found) => found)
      .catch((err: Error) => debug('Error fetching all: %s. %O', err.message, err.stack))
    return result
  },
  addExercise: async ({ input }): Promise<IExercise> => {
    debug('addExercise')
    const created = await Exercise
      .create(input)
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
