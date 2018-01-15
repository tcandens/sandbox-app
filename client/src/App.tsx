import * as React from 'react'
import { observer } from 'mobx-react'
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

@observer
export default class App extends React.Component {
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