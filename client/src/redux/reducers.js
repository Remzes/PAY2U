import { combineEpics } from 'redux-observable'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { callNotification } from '../ducks/notification'
import offersReducer, { fetchingOffers } from "../ducks/offers"
import clicksReducer, {fetchingClicks} from "../ducks/clicks"
import ticketReducer, {fetchingAddTicket} from "../ducks/tickets"

export const rootEpic = combineEpics(
  // Notification
  callNotification,
  // Offers
  fetchingOffers,
  // Clicks
  fetchingClicks,
  // Tickets
  fetchingAddTicket
)

export const rootReducer = history => combineReducers({
  router: connectRouter(history),
  offers: offersReducer,
  clicks: clicksReducer,
  ticket: ticketReducer
})
