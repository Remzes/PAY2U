import React from 'react'
import TableComponent from '../../TableComponent'
import renderColumns from '../../../helpers/tables/OffersTable/renderColumns'
import "./index.scss"
import _ from "lodash";

const isChanged = (prevProps, nextProps) => _.isEqual(prevProps.offers, nextProps.offers)

const OffersTable = React.memo(({offers, name}) => (
  <TableComponent
    name={`${name} offers-table`}
    fetching={offers.fetching}
    list={offers.list}
    columns={renderColumns}
  />
), isChanged)

export default OffersTable
