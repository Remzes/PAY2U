import {ofType} from 'redux-observable'
import {pluck, exhaustMap, switchMap, catchError, tap} from 'rxjs/operators'
import {of} from 'rxjs'
import {ajax} from 'rxjs/ajax'

import {requestNotification} from './notification'

const appName = "test"

// Types
export const moduleName = "offers"

export const REQUEST_OFFERS = `${appName}/${moduleName}/REQUEST_OFFERS`
export const SUCCESS_OFFERS = `${appName}/${moduleName}/SUCCESS_OFFERS`
export const ERROR_OFFERS = `${appName}/${moduleName}/ERROR_OFFERS`

// State
const initial = {
  fetching: false,
  fetched: true,
  success: false,
  list: []
}

// Reducer
export default (state = initial, action) => {
  const {type, payload} = action
  switch (type) {

    case REQUEST_OFFERS:
      return {...state, fetching: true, list: [], fetched: false, success: false}
    case SUCCESS_OFFERS:
      return {...state, fetching: false, list: payload.offers, fetched: true, success: true}
    case ERROR_OFFERS:
      return {...state, fetching: false, list: [], fetched: true, success: false}

    default:
      return state
  }
}

// Action Creators
export const requestOffers = () => ({type: REQUEST_OFFERS})

//Epics
export const fetchingOffers = action$ => {
  return (
    action$
      .pipe(
        ofType(REQUEST_OFFERS),
        exhaustMap(action => {
          return (
            ajax.get('/api/offers').pipe(
              pluck('response'),
              tap(res => { if (!res.success) throw new Error(res.message) }),
              switchMap(res => of({type: SUCCESS_OFFERS, payload: res})),
              catchError(err => of(
                {type: ERROR_OFFERS, payload: err},
                requestNotification("notification", false, err),
              ))
            )
          )
        })
      )
  )
}

