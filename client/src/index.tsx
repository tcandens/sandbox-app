import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import store from './stores'
import { AppContainer as HotContainer } from 'react-hot-loader'
import Entry from './entry'

const root = document.getElementById('root')

const render = Component => {
  ReactDOM.render(
    <HotContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </HotContainer>,
    root
  )
}

render(Entry)

if (module.hot) {
  module.hot.accept('./entry.tsx', function() {
    const FreshEntry = require('./entry.tsx').default
    render(FreshEntry)
  })
}
