import { observable, action } from 'mobx'
import agent from '../agent'

export interface IUser {
  id: number
  firstName: string
  lastName: string
  email: string
}

export interface IUserStore {
  isAuthenticated: boolean
  user: IUser
}

class UserStore implements IUserStore {
  @observable isAuthenticated = false
  @observable user = undefined

  @action
  getUser(id) {
    const result = agent(`
      query GetUser($id: Int!) {
        getUser(id: $id) {
          id
          firstName
          lastName
          email
        }
      }
    `, { id })
    result.then(action(({ data, errors }) => {
      if (errors) return
      this.user = data.getUser
    }))
  }

  @action
  getSelf() {
    const result = agent(`
      query GetSelf {
        getSelf {
          id
          firstName
          lastName
          email
        }
      }
    `, {})
    result.then(action(({ data, errors }) => {
      if (errors) return
      if (data.getSelf) {
        this.isAuthenticated = true
        this.user = data.getSelf
      }
    }))
      .catch(err => {
        console.warn(err)
      })
  }
}

export default new UserStore()