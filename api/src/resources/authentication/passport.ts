import * as passport from 'koa-passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import users from '../users/model'
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
    async (accessToken, refreshToken, profile, next) => {
      debug('Profile fed to Google OAuth strategy. %O', profile)
      const collection = await users
      let user
      try {
        user = await collection.findOne({
          authProvider: 'google',
          authId: profile.id,
        })

        if (!user) {
          user = await collection.insertOne({
            authProvider: 'google',
            authId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails.find(email => email.type === 'account').value,
          })
        }

        next(null, user)
      } catch (error) {
        console.log(error.stack)
        next(error)
      }
    },
  ),
)

export default passport
