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
    const operation = 'user'
    const result = agent(`
      query GetUser($id: Int!) {
        ${operation}(id: $id) {
          id
          firstName
          lastName
          email
        }
      }
    `, { id })
    result.then(action(({ data, errors }) => {
      if (errors) return
      this.user = data[operation]
    }))
  }

  @action
  getSelf() {
    const operation = 'self'
    const result = agent(`
      query {
        ${operation} {
          id
          firstName
          lastName
          email
        }
      }
    `, {})
    result.then(action(({ data, errors }) => {
      if (errors) return
      if (data[operation]) {
        this.isAuthenticated = true
        this.user = data[operation]
      }
    }))
      .catch(err => {
        console.warn(err)
      })
  }
}

export default new UserStore()