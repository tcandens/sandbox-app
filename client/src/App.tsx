import * as React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Entry from './Entry'

const NotFound = () => (
  <h1>Not Found!</h1>
)

export default function App () {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Entry} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}