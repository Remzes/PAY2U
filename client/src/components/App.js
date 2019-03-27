import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {requestOffers} from "../ducks/offers"

import Home from './Home'
import OffersPage from './Offers/OfferPage'

import 'antd/dist/antd.css';

class App extends Component {
  componentDidMount() {this.props.requestOffers()}

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/offers/:id" component={OffersPage} />
      </div>
    );
  }
}

export default connect(null, {requestOffers})(App);
