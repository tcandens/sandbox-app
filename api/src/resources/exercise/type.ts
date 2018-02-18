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

export default [Exercise, User]