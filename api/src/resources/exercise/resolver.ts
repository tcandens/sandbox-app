import Exercise from './model'

type IExerciseInput = {
  name: string,
  description?: string,
}

type IQueryExerciseArgs = {
  id: number,
}
type IAddExerciseArgs = {
  input: IExerciseInput,
}

export default {
  Query: {
    exercise: (root, args: IQueryExerciseArgs, ctx, info) => {
      return Exercise.getAll()
    },
  },
  // Mutations: {
  //   addExercise: (root, args: IAddExerciseArgs, ctx, info) => {
  //     const userId = ctx.state.user.id
  //     return userId && Exercise.create({
  //       ...args.input,
  //       userId,
  //     })
  //   },
  //   deleteExercise: (root, args, ctx, info) => {
  //     return Exercise.findById(args.id).then(exercise => exercise.destroy())
  //   },
  // },
}
