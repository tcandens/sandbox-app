import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Link, Redirect } from 'react-router-dom'
import { Button } from '../components/FormItems'
import { IUserStore } from '../stores/userStore'

type IProps = {
  userStore: IUserStore
  location
}

@observer
@inject('userStore')
export default class Auth extends React.Component<IProps> {
  render() {
    if (this.props.userStore.isAuthenticated) {
      return (
        <Redirect to="/" />
      )
    } else {
      return (
        <section>
          <a href="http://api.trainer.com/auth/google">
            <Button>Google</Button>
          </a>
          <Link to="/"><Button>Back</Button></Link>
        </section>
      )
    }
  }
}