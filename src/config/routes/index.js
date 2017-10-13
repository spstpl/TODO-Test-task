// The folder structure inside /App is aligned with
// this routes, so whenever you add a route, make sure
// it is in the /screens folder of its parent.
// Check below to see how its working.

import React from 'react'
import { IndexRoute, Route, Router } from 'react-router'
import {browserHistory} from 'react-router'
import App from 'App'

// Webpack 2 supports ES2015 `System.import` by auto-
// chunking assets. Check out the following for more:
// https://gist.github.com/sokra/27b24881210b56bbaff7#code-splitting-with-es6

const Todos = (nextState, cb) => {
  System.import('App/screens/Todos')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e })
}

const Lists = (nextState, cb) => {
  System.import('App/screens/Lists')
    .then(module => cb(null, module.default))
    .catch((e) => { throw e })
}

// We use `getComponent` to dynamically load routes.
// https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md
const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='lists' getComponent={Lists} />
      <Route path = 'lists/:id' getComponent = {Todos} />
    </Route>
  </Router>
)

// Unfortunately, HMR breaks when we dynamically resolve
// routes so we need to require them here as a workaround.
// https://github.com/gaearon/react-hot-loader/issues/288
if (module.hot) {
  require('App/screens/Todos')
  require('App/screens/Lists')
}

export default routes
