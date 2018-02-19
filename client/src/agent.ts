import gql from 'nanographql'
import qs from 'qs'

export default agent

const API_ROOT = 'http://api.trainer.com/graphql'

function agent(query, data = {}, options = {}) {
  const endpoint = `${API_ROOT}?${qs.stringify(gql(query)(data))}`
  const defaultOptions: any = {
    credentials: 'include',
  }
  return fetch(endpoint, Object.assign(defaultOptions, options))
    .then(response => response.json())
    .then(response => {
      if (response && response.data) {
        return response.data
      }
    })
    .catch(err => {
      console.log('GraphQL Agent Error')
      console.warn(err.stack)
    })
}
