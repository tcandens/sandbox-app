import * as React from 'react'
import { inject, observer } from 'mobx-react'
import Hello from './components/Hello'
import {IGeneralStore} from './stores'

interface IProps {
  store: IGeneralStore
}
interface IState {
  name: string
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
    const {
      name,
      description
    } = this.state
    this.props.store.addExercise({
      name,
      description,
    })
  }
  handleDelete = (id) => {
    this.props.store.destroyExercise(id)
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
        {!isLoading && exercises.map(({ name, description, id }) => (
          <div key={id}>
            <button onClick={() => this.handleDelete(id)}>X</button>
            <h4>{name}</h4>
            <span>{id}</span>
            <span>{description}</span>
          </div>
        ))}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={this.handleInputChange}
          />  
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
