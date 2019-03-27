import React, {Suspense, lazy} from 'react'
import {Spin, Button} from 'antd'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {requestClicks} from "../../../ducks/clicks"
import {requestAddTicket} from "../../../ducks/tickets"
import {requestNotification} from "../../../ducks/notification"
import "./index.scss"
const TicketForm = lazy(() => import("../../Tickets/TicketForm"))

class OfferPage extends React.Component {

  componentDidMount() {this.props.requestClicks(this.props.id)}

  render() {
    return (
      <div className="offers-page">
        <h2>Страница Предложения</h2>
        <Link to="/"><Button className="offers-page__back-to-main">На Главную</Button></Link>
        <Suspense fallback={<Spin spinning={true} />}>
          <TicketForm
            isTicketFetching={this.props.ticket.fetching}
            requestNotification={() => this.props.requestNotification('notification', false, "Выберите хотя бы одно предложение!")}
            requestAddTicket={this.props.requestAddTicket}
            offer_id={this.props.id}
            clicks={this.props.clicks}
          />
        </Suspense>
      </div>
    )
  }
}

export default connect((state, ownProps) =>
  ({
    ticket: state.ticket,
    clicks: state.clicks,
    id: ownProps.match.params.id
  }), {requestClicks, requestAddTicket, requestNotification})(OfferPage)
