import User from './model'

export const types = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Query {
    user(id: Int): User
    self: User
  }
`

export const resolvers = {
  user: async ({ id }, ctx, obj) => {
    return User.findById(id)
  },
  self: async (_, ctx) => {
    if (!ctx.state.user) return null
    return ctx.state.user
  },
}

export {
  User as model,
}
