import { observable, computed, action } from 'mobx'
import agent from '../agent'
import uuid from 'nanoid'
import { SubscriptionClient } from 'subscriptions-transport-ws'

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
  listenExercises(): void
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
    `
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
    const tempId = uuid()
    this.exercisesRegistry.set(`${tempId}`, Object.assign({}, exercise))
    const result = agent(
      `
      mutation CreateExercise($exercise: ExerciseInput) {
        ${operation} (input: $exercise)
      }
    `,
      { data: { exercise } }
    )
    result
      .then(
        action(data => {
          const _id = data[operation]
          this.exercisesRegistry.delete(`${tempId}`)
          this.exercisesRegistry.set(
            `${_id}`,
            Object.assign({}, exercise, { _id })
          )
        })
      )
      .catch(
        action(() => {
          this.exercisesRegistry.delete(`${tempId}`)
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
      { data: { ids } }
    )
    result.then(
      action(data => {
        ids.forEach(id => {
          this.exercisesRegistry.delete(id)
        })
      })
    )
  }

  @action
  listenExercises() {
    console.log('Creating subscription client')

    const wsClient = new SubscriptionClient(
      'ws://api.trainer.com:5000/subscriptions',
      {
        reconnect: true,
      }
    )

    const operation = 'exerciseAdded'

    const exercise$ = wsClient.request({
      query: `
        subscription ListenExercises {
          ${operation} {
            _id
            name
            description
          }
        }
    `,
    })

    exercise$.subscribe(
      action(({ data }) => {
        const added = data[operation]
        added.fromOther = true
        this.exercisesRegistry.set(`${added._id}`, added)
      })
    )
  }
}

export default new ExerciseStore()
