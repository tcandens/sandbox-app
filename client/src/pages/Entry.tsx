import * as React from 'react'
import { inject, observer } from 'mobx-react'
import Hello from '../components/Hello'
import { IExerciseStore } from '../stores/exerciseStore'
import { IUserStore } from '../stores/userStore'
import styled, { css } from 'react-emotion'
import ListItem from '../components/ListItem'
import { Link } from 'react-router-dom'
import { Button, Input } from '../components/FormItems'

const StyledContainer = styled('section')`
  width: 100%;
  padding: 0 1em;
  margin-top: 1em;
`
const StyledGrid = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1em;
`

type IProps = {
  exerciseStore: IExerciseStore
  userStore: IUserStore
}
type IState = {
  name: string
  description: string
}

@inject('exerciseStore', 'userStore')
@observer
export default class Entry extends React.Component<IProps, IState> {
  private nameInput: HTMLInputElement
  state = {
    name: '',
    description: '',
  }

  componentDidMount() {
    if (this.props.userStore.isAuthenticated) {
      this.props.exerciseStore.getExercises()
    }
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    const { name, description } = this.state
    this.props.exerciseStore.addExercise({
      name,
      description,
    })
    this.setState({ name: '', description: '' })
    this.nameInput.focus()
  }
  handleDelete = id => {
    this.props.exerciseStore.removeExercises([id])
  }
  render() {
    const { isLoading, exercises, addExercise } = this.props.exerciseStore
    const { isAuthenticated, user } = this.props.userStore
    return (
      <StyledContainer>
        {!isAuthenticated && (
          <Link to="/auth">
            <Button>Sign in</Button>
          </Link>
        )}
        {isAuthenticated && <span>Hello, {user.firstName}</span>}
        <form onSubmit={this.handleSubmit}>
          <Input
            innerRef={c => (this.nameInput = c)}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <Input
            type="text"
            name="description"
            placeholder="Add description here"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <Button type="submit">Add</Button>
        </form>
        <StyledGrid>
          {isLoading ? (
            <span>...</span>
          ) : (
            exercises.map((item, idx) => (
              <ListItem
                key={item._id}
                delete={() => this.handleDelete(item._id)}
                {...item}
              />
            ))
          )}
        </StyledGrid>
      </StyledContainer>
    )
  }
}
