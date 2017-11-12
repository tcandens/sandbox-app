const Koa = require('koa')
const webpackMiddleware = require('koa-webpack')

function startServer() {
  const app = new Koa()
  app.use(webpackMiddleware({
    dev: {
      publicPath: '/',
      stats: {
        colors: true,
      },
    }, 
    hot: {

    }
  }))
  app.listen(8080, '0.0.0.0', error => {
    if (error) console.warn(error)
    console.log('Starting dev server')
  })
  return app
}

module.exports = {
  startServer
}