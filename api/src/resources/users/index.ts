import User from './model'

export const types = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type Query {
    getUser(id: Int): User
    getSelf: User
  }
`

export const resolvers = {
  getUser: async ({ id }) => {
    return User.findById(id)
  },
  getSelf: async (_, ctx) => {
    if (!ctx.state.user) return null
    return ctx.state.user
  },
}

export {
  User as model,
}
