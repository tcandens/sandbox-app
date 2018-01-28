import * as passport from 'koa-passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../users/model'
import createDebug from 'debug'

const debug = createDebug('passport')

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = process.env

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://api.trainer.com/auth/google/callback',
    },
    (accessToken, refreshToken, profile, next) => {
      debug('Profile fed to Google OAuth strategy. %O', profile)
      User
        .findCreateFind({
          where: {
            authProvider: 'google',
            authId: profile.id,
          },
          defaults: {
            authProvider: 'google',
            authId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails.find(email => email.type === 'account').value,
          },
        })
        .spread((result, created) => {
          const user = result.get({ plain: true })
          if (created) {
            debug('Created new user: %O', user)
          } else {
            debug('Found user: %O', user)
          }
          return next(null, user)
        })
        .catch(error => {
          return next(error)
        })
    },
  ),
)

export default passport
