import { observable, computed, action } from 'mobx'
import agent from '../agent'

export interface IExercise {
  _id: number
  name: string
  description: string
}

export interface IExerciseStore {
  isLoading: boolean
  exercises
  exercisesRegistry: any
  getExercises(): void
  addExercise(IExercise): void
  removeExercises(ids: number[]): void
}

class ExerciseStore implements IExerciseStore {
  @observable isLoading = false
  @observable exercisesRegistry = observable.map()
  @computed
  get exercises() {
    return this.exercisesRegistry.values()
  }

  @action
  getExercises() {
    this.isLoading = true
    const operation = 'exercises'
    return agent(
      `
      query {
        ${operation} {
          _id,
          name,
          description
        }
      }
    `,
      {}
    )
      .then(data => {
        return data[operation]
      })
      .then(
        action((exercises: IExercise[]) => {
          this.exercisesRegistry.clear()
          exercises.forEach((exercise: IExercise) => {
            this.exercisesRegistry.set(`${exercise._id}`, exercise)
          })
        })
      )
      .finally(action(() => (this.isLoading = false)))
  }

  @action
  addExercise(exercise) {
    const operation = 'addExercise'
    const result = agent(
      `
      mutation CreateExercise($exercise: ExerciseInput) {
        ${operation} (input: $exercise)
      }
    `,
      { exercise },
      {
        method: 'POST',
      }
    )
    result.then(
      action(data => {
        const { id } = data[operation]
        this.exercisesRegistry.set(`${id}`, Object.assign({}, exercise, { id }))
      })
    )
  }

  @action
  removeExercises(ids) {
    const operation = 'removeExercises'
    const result = agent(
      `
      mutation RemoveExercise($ids: [String]) {
        ${operation}(ids: $ids)
      }
    `,
      { ids },
      {
        method: 'POST',
      }
    )
    result.then(
      action(data => {
        ids.forEach(id => {
          this.exercisesRegistry.delete(id)
        })
      })
    )
  }
}

export default new ExerciseStore()
