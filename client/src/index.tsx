import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import * as mobx from 'mobx'
import stores from './stores/'
import { AppContainer as HotContainer } from 'react-hot-loader'
import App from './App'
import { injectGlobal } from 'react-emotion'

mobx.useStrict(true)

injectGlobal`
  *, *:before, *:after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
`

const root = document.getElementById('root')

const render = Component => {
  ReactDOM.render(
    <HotContainer>
      <Provider {...stores}>
        <Component />
      </Provider>
    </HotContainer>,
    root
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App.tsx', function() {
    const FreshApp = require('./App.tsx').default
    render(FreshApp)
  })
}
