import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as graphqlHTTP from 'koa-graphql'

import { router as authRouter } from './authentication'
import { router as maintenanceRouter } from './maintenance'
import schema from './schema'

const rootRouter = new Router()

rootRouter.use(authRouter.routes())
rootRouter.use(maintenanceRouter.routes())

rootRouter.all('/', graphqlHTTP({
  schema,
  graphiql: true,
}))

export function resourcesDecorator (app: Koa) {
  app.use(rootRouter.routes()).use(rootRouter.allowedMethods())
}
