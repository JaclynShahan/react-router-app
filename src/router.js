import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'
import Login from './components/Login/Login.js'
import Home from './components/Home/Home'
import Forum from './components/Forum/Forum.js'

export default (
  <Provider store={store}>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/forum' component={Forum} />
    </Switch>
  </Provider>
)
