import { observable, action } from 'mobx'
import agent from '../agent'

export interface IExercise {
  id: number
  description: string
}

export interface IGeneralStore {
  isLoading: boolean
  exercises: IExercise[]
  getExercises(): void
}

class GeneralStore<IGeneralStore> {
  @observable isLoading = false
  @observable exercises
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
      .then(action(exercises => {
        this.exercises = exercises
      }))
      .finally(action(() => this.isLoading = false))
  }
}

export default new GeneralStore()