import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as graphqlHTTP from 'koa-graphql'
// import { buildSchema } from 'graphql'
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql'
import { mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

import exerciseType, { Model as Exercise } from './exercise'
import userType, { Model as User } from './users'
import { router as authRouter } from './authentication'
import { router as maintenanceRouter } from './maintenance'
import { GraphQLString, GraphQLID, GraphQLFloat } from 'graphql/type/scalars'

const rootRouter = new Router()

rootRouter.use(authRouter.routes())
rootRouter.use(maintenanceRouter.routes())

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => {
          return 'world'
        },
      },
      user: {
        type: userType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID),
          },
        },
        resolve: (obj, args, ctx, info) => {
          return User.findById(args.id)
        },
      },
      exercise: {
        type: exerciseType,
        args: {
          id: {
            name: 'id',
            type: GraphQLID,
          },
          name: {
            name: 'name',
            type: GraphQLString,
          },
        },
        resolve: (obj, args, ctx, info) => {
          return Exercise.findById(args.id)
        },
      },
    },
  }),
})

rootRouter.all('/', graphqlHTTP({
  schema,
  graphiql: true,
}))

export function resourcesDecorator (app: Koa) {
  app.use(rootRouter.routes()).use(rootRouter.allowedMethods())
}
