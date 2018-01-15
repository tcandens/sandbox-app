import * as React from 'react'
import { inject, observer } from 'mobx-react'
import Hello from './components/Hello'
import {IExerciseStore} from './stores/exerciseStore'
import styled, {css} from 'react-emotion'
import ListItem from './components/ListItem'

const styledFormItem = css`
  font-size: 1.8em;
  width: 100%;
  margin-bottom: 0.3em;
  padding: 0.4em 0.6em;
`
const StyledContainer = styled('section') `
  width: 100%;
  padding: 0 1em;
  margin-top: 1em;
`
const StyledGrid = styled('div') `
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1em;
`
const StyledInput = styled('input')`
  ${styledFormItem};
`
const StyledButton = styled('button') `
  ${styledFormItem};
  border: none;
  background-color: pink;
`

type IProps = {
  exerciseStore: IExerciseStore
}
type IState = {
  name: string
  description: string
}

@inject('exerciseStore')
@observer  
export default class Entry extends React.Component<IProps, IState> {
  private nameInput: HTMLInputElement
  state = {
    name: '',
    description: '',
  }

  componentDidMount() {
    this.props.exerciseStore.getExercises()
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
    this.props.exerciseStore.addExercise({
      name,
      description,
    })
    this.setState({name: '', description: ''})
    this.nameInput.focus()
  }
  handleDelete = (id) => {
    this.props.exerciseStore.destroyExercise(id)
  }
  render() {
    const {
      isLoading,
      exercises,
      addExercise,
    } = this.props.exerciseStore
    return (
      <StyledContainer>
        <form onSubmit={this.handleSubmit}>
          <StyledInput
            innerRef={(c) => this.nameInput = c}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />  
          <StyledInput
            type="text"
            name="description"
            placeholder="Add description here"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <StyledButton type="submit">Add</StyledButton>
        </form>
        <StyledGrid>
          {isLoading ?
            <span>...</span> :
            exercises.map((item) => (
              <ListItem
                key={item.id}
                delete={() => this.props.exerciseStore.destroyExercise(item.id)}
                {...item}
              />

            ))
          }
        </StyledGrid>
      </StyledContainer>
    )
  }
}
