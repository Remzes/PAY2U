import React from 'react'
import {Spin, Table} from 'antd'

const TableComponent = ({ className, fetching, list, rowKey = "id", rowSelection, columns, name, pagination = false }) => (
  <div className={name}>
    <Spin spinning={fetching}>
      <Table pagination={pagination} rowKey={rowKey} rowSelection={rowSelection} columns={columns} dataSource={list}/>
    </Spin>
  </div>
)

export default TableComponent
