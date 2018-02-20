import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as logger from 'koa-pino-logger'
import { resourcesDecorator } from './resources'
import * as jwt from 'koa-jwt'
import { verify } from 'jsonwebtoken'

const PORT = process.env.PORT

const app = new Koa()
app.use(logger())
app.use(
  jwt({
    secret: process.env.TOKEN_SECRET || null,
    cookie: 'Authorization',
  }).unless({
    path: [/(auth)/],
  })
)

resourcesDecorator(app)

export default app
