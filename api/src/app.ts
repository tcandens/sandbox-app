import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as logger from 'koa-pino-logger'
import * as bodyParser from 'koa-bodyparser'
import { resourcesDecorator } from './resources'

const PORT = process.env.PORT

const app = new Koa()
app.use(bodyParser())
app.use(logger())

resourcesDecorator(app)

export default app
