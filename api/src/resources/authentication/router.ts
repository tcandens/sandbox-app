import * as Router from 'koa-router'
import passport from './passport'
import * as jwt from 'jsonwebtoken'
import { pick } from 'lodash'

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
      const user = pick(ctx.state.user, [
        'id',
        'firstName',
        'lastName',
        'email',
      ])
      const token = jwt.sign(user, process.env.TOKEN_SECRET || null, {
        expiresIn: (60 * 2),
      })
      ctx.cookies.set('Authorization', token, { domain: '.trainer.com', secure: false, overwrite: true })
      ctx.redirect('http://dev.trainer.com/auth/success')
    },
  )
