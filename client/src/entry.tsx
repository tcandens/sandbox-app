import * as React from 'react'
import { inject, observer } from 'mobx-react'
import Hello from './components/Hello'
import {IGeneralStore} from './stores'

interface IProps {
  store: IGeneralStore
}

@inject('store')
@observer  
export default class Entry extends React.Component<IProps> {
  componentDidMount() {
    this.props.store.getExercises()
  }
  render() {
    return (
      <section>
        {this.props.store.exercises.map(({ description, id }) => (
          <div key={id}>
            <span>{description}</span>
          </div>
        ))}
      </section>
    )
  }
}
