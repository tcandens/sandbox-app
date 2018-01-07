import * as React from 'react'

export interface HelloProps {name: string}

export default class Hello extends React.Component<HelloProps, {}> {
  render() {
    return (
        <h1>Hold me, {this.props.name}</h1>
      )
  }
}
