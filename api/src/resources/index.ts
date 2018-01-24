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

import * as exercise from './exercise'
import * as user from './users'
import { router as authRouter } from './authentication'
import { router as maintenanceRouter } from './maintenance'
import { GraphQLString, GraphQLID, GraphQLFloat } from 'graphql/type/scalars'

const rootRouter = new Router()

rootRouter.use(authRouter.routes())
rootRouter.use(maintenanceRouter.routes())

// const typeDefs = mergeTypes([
//   exercise.types,
//   user.types,
// ])

// const root = mergeResolvers([
//   exercise.resolvers,
//   user.resolvers,
// ])

// const schema = buildSchema(typeDefs)

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User first name',
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User last name',
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Users email address',
    },
  },
})

const exerciseType = new GraphQLObjectType({
  name: 'Exercise',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLFloat,
    },
    updatedAt: {
      type: GraphQLFloat,
    },
    userId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
})

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
          return user.model.findById(args.id)
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
          return exercise.model.findById(args.id)
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
