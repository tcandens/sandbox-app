import { observable, computed, action } from 'mobx'
import agent from '../agent'

export interface IExercise {
  id: number
  description: string
}

export interface IGeneralStore {
  isLoading: boolean
  exercises
  exercisesRegistry: any
  getExercises(): void
  addExercise(IExercise): void
}

class GeneralStore implements IGeneralStore {
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
    result.then((response) => {
      if (response.errors) {
        console.dir(response.errors)
      } else if (response.data) {
        this.exercisesRegistry.set(
          `${response.data.id}`,
          exercise
        )
      }
    })
  }
}

export default new GeneralStore()