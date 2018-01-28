export default `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    exercises: [Exercise]
  }
`
