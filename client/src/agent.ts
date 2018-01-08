import gql from 'nanographql'
import qs from 'qs'

export default agent

const API_ROOT = 'http://api.trainer.com'

function agent(query, data = {}, options = {}) {
  const endpoint = `${API_ROOT}/?${qs.stringify(gql(query)(data))}`
  return fetch(endpoint, options)
    .then(response => response.json())
    .catch(err => console.warn(err))
}
