import User from '../users/type'

const Exercise = `
  type Exercise {
    _id: ID!
    name: String!
    description: String
    createdAt: Float!
    updatedAt: Float
    user: User
    deleted: Boolean
  }
`

export default [Exercise, User]
