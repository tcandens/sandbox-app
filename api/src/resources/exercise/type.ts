import User from '../users/type'

const Exercise = `
  type Exercise {
    id: ID!
    name: String!
    description: String
    createdAt: Float!
    updatedAt: Float
    user: User
  }
`

const ExerciseInput = `
  input ExerciseInput {
    name: String!
    description: String
  }
`

export default [Exercise, ExerciseInput, User]
