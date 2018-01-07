import { observable, action } from 'mobx'
import agent from '../agent'

export interface IGeneralStore {
  isLoading: boolean
  exercises: {}[]
  getExercises(): void
}

class GeneralStore<IGeneralStore> {
  @observable isLoading = false
  @observable exercises
  @action getExercises() {
    this.isLoading = true
    agent(`
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