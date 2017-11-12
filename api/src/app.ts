import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as pino from 'koa-pino-logger'
import * as graphqlHTTP from 'koa-graphql'
import { buildSchema } from 'graphql'
import maintenanceRouter from './features/maintenance/router'

const PORT = process.env.PORT

const app = new Koa()
app.use(pino())

const router = new Router()

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

router.all('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}))

router.use(maintenanceRouter.routes())

app.use(router.routes()).use(router.allowedMethods())

export default app
