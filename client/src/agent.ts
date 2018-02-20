import gql from 'nanographql'
import qs from 'qs'

const API_ROOT = 'http://api.trainer.com/graphql'

const defaultFetchOptions: any = {
  credentials: 'include',
  mode: 'cors',
}

type AgentOptions = {
  data: object
}

export const buildQuery = (query: string, options?: AgentOptions) => {
  const data = options && options.data ? options.data : {}
  return {
    q: gql(query)(data),
  }
}

export function mutation(q: object, options?: AgentOptions) {
  const endpoint = `${API_ROOT}`
  const fetchOptions = Object.assign({}, defaultFetchOptions, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(q),
  })

  return commonFetch(endpoint, fetchOptions)
}

export function query(q: object, options?: AgentOptions) {
  const endpoint = `${API_ROOT}/?${qs.stringify(q)}`
  const fetchOptions = Object.assign({}, defaultFetchOptions, {
    method: 'GET',
  })

  return commonFetch(endpoint, fetchOptions)
}

const agents = {
  mutation,
  query,
  subscription: mutation,
}

export default function agent(rawQuery: string, options?: AgentOptions) {
  const { q } = buildQuery(rawQuery, options)
  const operation = detectOperation(rawQuery)
  return agents[operation] ? agents[operation](q, options) : () => {}
}

function commonFetch(endpoint, options) {
  return fetch(endpoint, options)
    .then(response => response.json())
    .then(response => {
      if (response && response.data) {
        return response.data
      } else {
        if (response && response.errors) console.dir(response.errors)
        throw new Error('Response has no data')
      }
    })
    .catch(error => {
      console.log('GraphQL Agent Error')
      console.warn(error.stack)
    })
}

function detectOperation(s: string) {
  const regex = /^\s*(query|mutation|subscription)/
  const result = regex.exec(s)
  return result[1]
}
