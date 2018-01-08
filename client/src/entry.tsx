import * as React from 'react'
import { inject, observer } from 'mobx-react'
import Hello from './components/Hello'
import {IGeneralStore} from './stores'

interface IProps {
  store: IGeneralStore
}
interface IState {
  description: string
}

@inject('store')
@observer  
export default class Entry extends React.Component<IProps, IState> {
  componentDidMount() {
    this.props.store.getExercises()
  }
  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const id = this.props.store.exercises.length + 1
    const description = this.state.description
    this.props.store.addExercise({
      id,
      description,
    })
  }
  render() {
    const {
      isLoading,
      exercises,
      addExercise,
    } = this.props.store
    return (
      <section>
        {isLoading && <span>...</span>}
        {!isLoading && exercises.map(({ description, id }) => (
          <div key={id}>
            <span>{description}</span>
          </div>
        ))}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Add description here"
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
      </section>
    )
  }
}
