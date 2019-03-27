import React, {lazy, Suspense} from 'react'
import {Spin} from 'antd'
import {Form} from 'react-final-form'
import InnerForm from "./InnerForm"
import MakeAsyncFunction from "react-redux-promise-listener"
import {REQUEST_ADD_TICKET, SUCCESS_ADD_TICKET, ERROR_ADD_TICKET} from '../../../ducks/tickets'
import {promiseListener} from "../../../redux/store"
import "./index.scss"

const ClicksTable = lazy(() => import("../../Clicks/ClicksTable"))

const TicketForm = ({clicks, offer_id, requestAddTicket, requestNotification, isTicketFetching}) => {
  return (
    <Spin spinning={isTicketFetching}>
      <MakeAsyncFunction
        listener={promiseListener}
        start={REQUEST_ADD_TICKET}
        resolve={SUCCESS_ADD_TICKET}
        reject={ERROR_ADD_TICKET}
      >
        {
          () => (
            <Form
              className="offers-page__ticket-form"
              initialValues={{tickets: {clicks: "[]", offer_id}}}
              onSubmit={values => {
                if (JSON.parse(values.tickets.clicks).length === 0) return requestNotification()
                requestAddTicket(values.tickets)
              }}
            >
              {({handleSubmit, form, change, reset, submitting, pristine}) => {
                return (
                  <React.Fragment>
                    <Suspense fallback={<Spin spinning={true}/>}>
                      <ClicksTable name="offers-page__ticket-form"
                                   updateChosen={values => change('tickets[clicks]', values)} clicks={clicks}/>
                    </Suspense>
                    <InnerForm handleSubmit={handleSubmit} pristine={pristine} reset={reset} submitting={submitting}/>
                  </React.Fragment>
                )
              }}
            </Form>
          )
        }
      </MakeAsyncFunction>
    </Spin>
  )
}

export default TicketForm
