import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as graphqlHTTP from 'koa-graphql'
import { buildSchema } from 'graphql'

import { router as maintenanceRouter } from './maintenance'

const rootRouter = new Router()

rootRouter.use(maintenanceRouter.routes())

const schema = buildSchema(`
  type Exercise {
    id: Int!
    name: String!
  }
  type Query {
    getExercises: [Exercise]
  }
`)

const EXERCISES = [
  { id: 1, name: 'Crunches' },
  { id: 2, name: 'Dips' },
]

const root = {
  getExercises: () => {
    return EXERCISES
  },
}

rootRouter.all('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}))

export function routesDecorator (app: Koa) {
  app.use(rootRouter.routes()).use(rootRouter.allowedMethods())
}
