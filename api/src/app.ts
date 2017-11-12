import * as Koa from 'koa'

const PORT = process.env.PORT

const app = new Koa()

app.use(async ctx => {
  ctx.body = 'Hello Friend'
})

export default app
