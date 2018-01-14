const Koa = require('koa')
const logger = require('koa-pino-logger')
const WebpackMiddleware = require('koa-webpack')

const app = new Koa()
const webpackMiddleware = WebpackMiddleware({
  dev: {
    publicPath: '/',
    stats: {
      colors: true,
    },
  }, 
})

app.use(logger())
app.use(webpackMiddleware)

app.listen(8080, '0.0.0.0', error => {
  if (error) console.warn(error)
  console.log('Starting dev server')
})

module.exports = app


