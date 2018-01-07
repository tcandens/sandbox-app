import * as React from 'react'
import Hello from './Components/Hello'
import gql from 'nanographql'
import qs from 'qs'

const API_ROOT = 'http://api.trainer.com'

const query = gql`
  query {
    getAllExercises {
      id,
      description
    }
  }
`
const endpoint = `${API_ROOT}/?${qs.stringify(query())}`

export default class Entry extends React.Component {
  state = {
    exercises: []
  }
  componentDidMount() {
    fetch(endpoint)
      .then(response => response.json())
      .then(({data}) => {
        this.setState({
          exercises: data.getAllExercises
        });
      })
      .catch(err => console.warn(err))
  }
  render() {
    return (
      <section>
        {this.state.exercises.map(({description, id}) => (
          <div key={id}>
            <span>{description}</span>
          </div>
        ))}
      </section>
    )
  }
}
