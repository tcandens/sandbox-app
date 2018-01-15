import * as React from 'react'
import { Link } from 'react-router-dom'

export default class Auth extends React.Component {
  render() {
    return (
      <section>
        <a href="http://api.trainer.com/auth/google">Google</a>
        <Link to="/">Back</Link>
      </section>
    )
  }
}