import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer as HotContainer } from 'react-hot-loader'
import Entry from './entry'

const root = document.getElementById('root')

const render = Component => {
  ReactDOM.render(
    <HotContainer>
      <Component />
    </HotContainer>,
    root
  )
}

render(Entry)

if (module.hot) {
  module.hot.accept('./entry.tsx', function() {
    console.log('Reloading!')
    render(Entry)
  })
}
