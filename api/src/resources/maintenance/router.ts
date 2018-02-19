import { connect } from '../../connections/mongo'
import * as Router from 'koa-router'

const maintenanceRouter = new Router({
  prefix: '/maintenance',
})

maintenanceRouter.get('/db', async (ctx, next) => {
  await connect()
    .then(() => {
      ctx.log.info('Database is available.')
      ctx.status = 200
      ctx.body = 'Database is available'
    })
    .catch((error: Error) => {
      ctx.log.error('Database is unavailable', {
        message: error.message,
        stack: error.stack,
      })
      ctx.stats = 500
      ctx.body = error.stack || error.message
    })
})

export default maintenanceRouter
