import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as logger from 'koa-pino-logger'
import { routesDecorator } from './features'

const PORT = process.env.PORT

const app = new Koa()
app.use(logger())

routesDecorator(app)

export default app
