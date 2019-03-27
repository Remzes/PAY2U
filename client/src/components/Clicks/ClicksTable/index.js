import React from 'react'
import _ from 'lodash'
import TableComponent from '../../TableComponent'
import renderColumns from '../../../helpers/tables/ClicksTable/renderColumns'
import rowSelection from '../../../helpers/tables/ClicksTable/rowSelection'
import "./index.scss"

const isChanged = (prevProps, nextProps) => _.isEqual(prevProps.clicks, nextProps.clicks)

const ClicksTable = React.memo(({ clicks, name, updateChosen }) => (
  <TableComponent
    rowSelection={rowSelection(updateChosen)}
    name={`${name} clicks-table`}
    fetching={clicks.fetching}
    list={clicks.list}
    columns={renderColumns}
  />
), isChanged)

export default ClicksTable
