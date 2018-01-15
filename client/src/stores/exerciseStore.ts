import { observable, computed, action } from 'mobx'
import agent from '../agent'

export interface IExercise {
  id: number
  description: string
}

export interface IExerciseStore {
  isLoading: boolean
  exercises
  exercisesRegistry: any
  getExercises(): void
  addExercise(IExercise): void
  destroyExercise(id: number): void
}

class ExerciseStore implements IExerciseStore {
  @observable isLoading = false
  @observable exercisesRegistry = observable.map()
  @computed get exercises() {
    return this.exercisesRegistry.values()
  }

  @action getExercises() {
    this.isLoading = true
    const operation = 'getExercises'
    return agent(`
      query {
        ${operation} {
          id,
          name,
          description
        }
      }
    `, {})
      .then(({ data }) => data[operation])
      .then(action((exercises: IExercise[]) => {
        this.exercisesRegistry.clear()
        exercises.forEach((exercise: IExercise) => {
          this.exercisesRegistry.set(`${exercise.id}`, exercise)
        })
      }))
      .finally(action(() => this.isLoading = false))
  }

  @action
  addExercise(exercise) {
    const operation = 'addExercise'
    const result = agent(`
      mutation CreateExercise($exercise: ExerciseInput) {
        ${operation}(input: $exercise) {
          id
        }
      }
    `, { exercise }, {
      method: 'POST'  
    })
    result.then(action(({data, errors}) => {
      if (errors) return
      const { id } = data[operation]
      this.exercisesRegistry.set(
        `${id}`,
        Object.assign({}, exercise, { id })
      )
    }))
  }

  @action
  destroyExercise(id) {
    const operation = 'destroyExercise'
    const result = agent(`
      mutation DestroyExercise($id: Int!) {
        ${operation}(id: $id) {
          id
        }
      }
    `, { id }, {
      method: 'POST'
    })
    result.then(action(({data, errors}) => {
      if (errors) return
      this.exercisesRegistry.delete(id)
    }))
  }
}

export default new ExerciseStore()