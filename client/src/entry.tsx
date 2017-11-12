import * as React from 'react'
import Hello from './Components/Hello'

export default class Entry extends React.Component {
  render() {
    return (
      <section>
        <Hello name="Buddy" />
      </section>
    )
  }
}
