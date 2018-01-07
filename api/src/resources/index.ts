import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as graphqlHTTP from 'koa-graphql'
import { buildSchema } from 'graphql'
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

import * as exercise from './exercise'
import { router as authRouter } from './authentication'
import { router as maintenanceRouter } from './maintenance'

const rootRouter = new Router()

rootRouter.use(authRouter.routes())
rootRouter.use(maintenanceRouter.routes())

const typeDefs = mergeTypes([
  exercise.types,
])

const root = mergeResolvers([
  exercise.resolvers,
])

const schema = buildSchema(typeDefs)

rootRouter.all('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}))

export function resourcesDecorator (app: Koa) {
  app.use(rootRouter.routes()).use(rootRouter.allowedMethods())
}
