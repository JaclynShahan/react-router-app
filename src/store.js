import { createStore, applyMiddleware, combineReducers } from 'redux'

import promiseMiddleware from 'redux-promise-middleware'

import setUser from './reducers/setUser'
import getPost from './reducers/getPost'

export default createStore(
  combineReducers({
    setUser,
    getPost
  }),
  applyMiddleware(promiseMiddleware)
)
