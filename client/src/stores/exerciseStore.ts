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

class GeneralStore implements IExerciseStore {
  @observable isLoading = false
  @observable exercisesRegistry = observable.map()
  @computed get exercises() {
    return this.exercisesRegistry.values()
  }

  @action getExercises() {
    this.isLoading = true
    return agent(`
      query {
        getAllExercises {
          id,
          name,
          description
        }
      }
    `, {})
      .then(({ data }) => data.getAllExercises)
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
    const result = agent(`
      mutation CreateExercise($exercise: ExerciseInput) {
        addExercise(input: $exercise) {
          id
        }
      }
    `, { exercise }, {
      method: 'POST'  
    })
    result.then(({data, errors}) => {
      if (errors) return
      const { id } = data.addExercise
      this.exercisesRegistry.set(
        `${id}`,
        Object.assign({}, exercise, { id })
      )
    })
  }

  @action
  destroyExercise(id) {
    const result = agent(`
      mutation DestroyExercise($id: Int!) {
        destroyExercise(id: $id) {
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

export default new GeneralStore()