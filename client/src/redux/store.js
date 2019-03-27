import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createEpicMiddleware } from 'redux-observable'
import createReduxPromiseListener from 'redux-promise-listener'

import { rootReducer, rootEpic } from './reducers'
import history from '../history'

// Create epic middleware
const epicMiddleware = createEpicMiddleware()
// Redux Promise Listener
const reduxPromiseListener = createReduxPromiseListener()
export const promiseListener = reduxPromiseListener

// Combine Reducers
const reducers = rootReducer(history)

// Middleware instance
const enhancer = applyMiddleware(reduxPromiseListener.middleware, routerMiddleware(history), epicMiddleware)
const store = createStore(reducers, enhancer)
epicMiddleware.run(rootEpic)
window.store = store

export default store
