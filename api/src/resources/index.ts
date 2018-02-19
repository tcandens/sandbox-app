import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa'
import { runSubscriptionServer } from './subscriptions'

import { router as authRouter } from './authentication'
import { router as maintenanceRouter } from './maintenance'
import schema from './schema'

const WS_PORT = 5000
const WS_ENDPOINT = '/subscriptions'

const rootRouter = new Router()

rootRouter.use(authRouter.routes())
rootRouter.use(maintenanceRouter.routes())

rootRouter.all(
  '/graphql',
  bodyParser(),
  graphqlKoa(context => {
    return {
      schema,
      context,
    }
  })
)

rootRouter.get(
  '/graphiql',
  graphiqlKoa({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://api.trainer.com:${WS_PORT}${WS_ENDPOINT}`,
  })
)

export function resourcesDecorator(app: Koa) {
  app.use(rootRouter.routes()).use(rootRouter.allowedMethods())

  runSubscriptionServer({
    schema,
    port: WS_PORT,
    path: WS_ENDPOINT,
  })
}
