import {ofType} from 'redux-observable'
import {pluck, exhaustMap, switchMap, catchError, tap} from 'rxjs/operators'
import {of} from 'rxjs'
import {ajax} from 'rxjs/ajax'

import {requestNotification} from './notification'

const appName = "test"

// Types
export const moduleName = "tickets"

export const REQUEST_CLICKS = `${appName}/${moduleName}/REQUEST_CLICKS`
export const SUCCESS_CLICKS = `${appName}/${moduleName}/SUCCESS_CLICKS`
export const ERROR_CLICKS = `${appName}/${moduleName}/ERROR_CLICKS`

// State
const initial = {
  fetching: false,
  fetched: true,
  success: false,
  list: []
}

// Reducer
export default (state = initial, action) => {
  const { type, payload } = action
  switch (type) {

    case REQUEST_CLICKS:
      return { ...state, fetching: true, list: [], fetched: false, success: false }
    case SUCCESS_CLICKS:
      return { ...state, fetching: false, list: payload.clicks, fetched: true, success: true }
    case ERROR_CLICKS:
      return { ...state, fetching: false, list: [], fetched: true, success: false }

    default:
      return state
  }
}

// Action Creators
export const requestClicks = id => ({ type: REQUEST_CLICKS, id })

//Epics
export const fetchingClicks = action$ => {
  return (
    action$
      .pipe(
        ofType(REQUEST_CLICKS),
        exhaustMap(action => {
          return (
            ajax.get(`/api/clicks/${action.id}`).pipe(
              pluck('response'),
              tap(res => { if (!res.success) throw new Error(res.message) }),
              switchMap(res => {
                return of({ type: SUCCESS_CLICKS, payload: res })
              }),
              catchError(err => of(
                { type: ERROR_CLICKS, payload: err },
                requestNotification("notification", false, err),
              ))
            )
          )
        })
      )
  )
}
