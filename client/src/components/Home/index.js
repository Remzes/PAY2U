import React, {lazy, Suspense} from 'react'
import {Spin} from 'antd'
import {connect} from 'react-redux'
import {requestClicks} from "../../ducks/clicks"
const OffersTable = lazy(() => import('../Offers/OffersTable'))

class Home extends React.Component {
  render() {
    return (
      <div className="home-page">
        <h2>Главная Страница</h2>
        <Suspense fallback={<Spin spinning={true} />}>
          <OffersTable offers={this.props.offers} requestClicks={this.props.requestClicks} />
        </Suspense>
      </div>
    )
  }
}

export default connect(state => ({ offers: state.offers }), {requestClicks})(Home)
