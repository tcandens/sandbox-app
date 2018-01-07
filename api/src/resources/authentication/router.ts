import * as Router from 'koa-router'
import passport from './passport'
import * as jwt from 'jsonwebtoken'

import * as chalk from 'chalk'

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'Token Secret'

export const router = new Router({
  prefix: '/auth',
})
  .use(passport.initialize())
  .get(
    '/google',
    passport.authenticate('google', {
      session: false,
      scope: ['email', 'profile'],
    }),
  )
  .get(
    '/google/callback',
    passport.authenticate('google', {
      session: false,
      failureRedirect: '/auth/failure',
    }),
    async (ctx, next) => {
      const user = ctx.req.user
      console.log(chalk.green('SOMETHING!'))
      console.dir(ctx.req)
      ctx.redirect('/success')
    },
  )
