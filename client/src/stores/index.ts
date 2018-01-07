import { observable, computed, action } from 'mobx'
import agent from '../agent'

export interface IExercise {
  id: number
  description: string
}

export interface IGeneralStore {
  isLoading: boolean
  exercises: IExercise[]
  exercisesRegistry: any
  getExercises(): void
  addExercise(): void
}

class GeneralStore<IGeneralStore> {
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
  @action.bound
  addExercise() {
    const id = this.exercisesRegistry.size + 1
    return this.exercisesRegistry.set(
      `${id}`,
      {
        id,
        description: 'Hello!'
      }
    )
  }
}

export default new GeneralStore()