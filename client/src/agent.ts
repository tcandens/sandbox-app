import gql from 'nanographql'
import qs from 'qs'
import { ExecutionResult } from 'graphql'

export default agent

const API_ROOT = 'http://api.trainer.com'

function agent(query, data = {}, options = {}) {
  const endpoint = `${API_ROOT}/?${qs.stringify(gql(query)(data))}`
  const defaultOptions: any = {
    credentials: 'include',
  }
  return fetch(endpoint, Object.assign(defaultOptions, options))
    .then(response => response.json())
    .then((response: ExecutionResult) => {
      if (response && response.data) {
        return response.data
      }
      if (response && response.errors) {
        console.dir(response.errors)
        throw new Error('GraphQL Agent Errors')
      }
    })
    .catch(err => {
      console.log('GraphQL Agent Error')
      console.warn(err.stack)
    })
}
