import {ofType} from 'redux-observable'
import {pluck, mapTo, exhaustMap, switchMap, catchError, tap} from 'rxjs/operators'
import {of, timer, merge} from 'rxjs'
import {ajax} from 'rxjs/ajax'
import {push} from 'connected-react-router'

import {requestNotification} from './notification'

const appName = "test"

// Types
export const moduleName = "offers"

export const REQUEST_ADD_TICKET = `${appName}/${moduleName}/REQUEST_ADD_TICKET`
export const SUCCESS_ADD_TICKET = `${appName}/${moduleName}/SUCCESS_ADD_TICKET`
export const ERROR_ADD_TICKET = `${appName}/${moduleName}/ERROR_ADD_TICKET`

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

    case REQUEST_ADD_TICKET:
      return { ...state, fetching: true, list: [], fetched: false, success: false }
    case SUCCESS_ADD_TICKET:
      return { ...state, fetching: false, list: payload.offers, fetched: true, success: true }
    case ERROR_ADD_TICKET:
      return { ...state, fetching: false, list: [], fetched: true, success: false }

    default:
      return state
  }
}

// Action Creators
export const requestAddTicket = tickets => ({ type: REQUEST_ADD_TICKET, tickets })

//Epics
export const fetchingAddTicket = action$ => {
  return (
    action$
      .pipe(
        ofType(REQUEST_ADD_TICKET),
        exhaustMap(action => {
          return (
            ajax.post('/api/tickets', {...action.tickets}).pipe(
              pluck('response'),
              tap(res => { if (!res.success && !res.errors) throw new Error(res.message) }),
              switchMap(res => {

                // Хэндлим ошибки с бэка по поводу валидации и выкидываеи нотификации
                if (res.errors) {
                  const notifications = []
                  for (let key in res.errors) {
                    notifications.push(of(requestNotification('notification', false, res.errors[key])))
                  }
                  return merge(
                    of({ type: ERROR_ADD_TICKET }),
                    ...notifications
                  )
                }

                return merge(
                  of({type: SUCCESS_ADD_TICKET, payload: res}),
                  of(requestNotification('notification', true, res.message)),
                  timer(100).pipe(
                    mapTo(push('/'))
                  )
                )
              }),
              catchError(err => of(
                { type: ERROR_ADD_TICKET, payload: err },
                requestNotification("notification", false, err),
              ))
            )
          )
        })
      )
  )
}

