import * as React from 'react'
import { observer, inject } from 'mobx-react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Entry from './pages/Entry'
import Auth from './pages/Auth'

const NotFound = () => (
  <h1>Not Found!</h1>
)

type IProps = {
  userStore
}

@observer
@inject('userStore')
export default class App extends React.Component <IProps> {
  componentWillMount() {
    this.props.userStore.getSelf()
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Entry} />
          <Route path="/auth" component={Auth} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
} 